import { observable, action } from 'mobx';

import Hosts from '../services/Hosts';
import AuthApi from '../services/AuthApi';
import PlacesApi from '../services/PlacesApi';

import ActionCable from 'actioncable';

class WanderersStore {
  @observable
  viewport = {
    width: window.innerWidth,
    height: window.innerHeight * 0.9,
    latitude: 43.65323,
    longitude: -79.38318,
    zoom: 13
  };

  @observable user = null;
  @observable popupPlace = null;
  @observable places = [];
  @observable trips = [];
  @observable trip = null;
  @observable messages = [];
  @observable buddies = [];
  @observable stops = [];
  @observable videoToken = null;
  @observable tripImages = [];

  constructor() {
    this.authApi = new AuthApi();
    this.placesApi = new PlacesApi();

    this.cable = ActionCable.createConsumer(`${Hosts.placesHost()}/cable`);

    // ensure that there is a user & load user into state (makes it available in store)
    const session_user = sessionStorage.getItem('user');
    if (session_user) {
      this.user = JSON.parse(session_user);
      this.setupUserSubscription();
    }

    if (this.user) {
      this.searchPlaces(43.65323, -79.38318);
    }
  }

  @action
  login = async (email, password) => {
    const response = await this.authApi.login(email, password);

    if (response.data.error) {
      return false;
    } else {
      this.user = response.data;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return true;
    }
  };

  @action
  signup = async (name, email, password, image) => {
    const response = await this.authApi.signup(name, email, password, image);

    if (response.data.error) {
      return response.data.error;
    } else {
      this.user = response.data;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return true;
    }
  };

  @action
  logout = () => {
    sessionStorage.clear();
    this.user = null;
  };

  @action
  searchPlaces = async (lat, lon, type = '') => {
    this.viewport.latitude = lat;
    this.viewport.longitude = lon;
    this.viewport.zoom = 12;

    const response = await this.placesApi.search(
      this.user.token,
      lat,
      lon,
      type
    );

    this.places = response.data;
  };

  @action
  updatePopupPlace = place => {
    this.popupPlace = place;
  };

  @action
  createTrip = async name => {
    const response = await this.placesApi.createTrip(this.user.token, name);
    // return the trip
    return response.data;
  };

  @action
  loadTrip = async id => {
    const response = await this.placesApi.loadTrip(this.user.token, id);
    // set trip when response is back
    this.trip = response.data;
    this.setupSubscription(id);
    this.loadMessages(id);
    this.loadBuddies(id);
    this.loadTripImages(id);
    await this.loadVideoToken(id);
    await this.loadStops(id);

    if (this.stops.length > 0) {
      this.searchPlaces(
        parseFloat(this.stops[0].place.lat),
        parseFloat(this.stops[0].place.lon)
      );
    }
  };

  @action
  loadTrips = async () => {
    const response = await this.placesApi.loadTrips(this.user.token);
    this.trips = response.data;
  };

  @action
  sendInvitation = async email => {
    await this.placesApi.sendInvitation(this.user.token, email, this.trip.id);
  };

  // call to placesApi to create buddy
  @action
  joinTrip = async (tripId, history) => {
    await this.placesApi.joinTrip(this.user.token, tripId);
    history.push(`/trips/${tripId}`);
  };

  // Real time stuff events for chat and stop
  @action
  setupSubscription = tripId => {
    this.subscription = this.cable.subscriptions.create(
      {
        channel: 'TripChannel',
        trip_id: tripId
      },
      {
        // comes from talk method in trip channel
        received: ({ type, data }) => {
          if (type === 'new_message') {
            this.messages.push(data);
          } else if (type === 'new_stop') {
            this.stops.push(data);
          } else if (type === 'remove_stop') {
            this.stops = this.stops.filter(stop => stop.id !== data);
          }
        }
      }
    );
  };

  @action
  setupUserSubscription = () => {
    if (this.user) {
      this.userSubscription = this.cable.subscriptions.create(
        {
          channel: 'UserChannel',
          user_token: this.user.token
        },
        {
          received: ({ type, data }) => {
            console.log(type, data);
            if (type === 'new_place') {
              this.places.push(data);
            }
          }
        }
      );
    }
  };

  @action
  sendMessage = text => {
    this.subscription.perform('talk', {
      text: text,
      user_id: this.user.id
    });
  };

  @action
  loadMessages = async tripId => {
    const response = await this.placesApi.loadMessages(this.user.token, tripId);
    this.messages = response.data;
  };

  @action
  loadBuddies = async tripId => {
    const response = await this.placesApi.loadBuddies(this.user.token, tripId);
    this.buddies = response.data;
  };

  @action
  addStopToTrip = async placeId => {
    await this.placesApi.addStopToTrip(this.user.token, this.trip.id, placeId);
  };

  @action
  removeStopFromTrip = async stopId => {
    await this.placesApi.removeStopFromTrip(
      this.user.token,
      this.trip.id,
      stopId
    );
  };

  @action
  loadStops = async tripId => {
    const response = await this.placesApi.loadStops(this.user.token, tripId);
    this.stops = response.data;
  };

  @action
  markTripCompleted = async (trip, completed) => {
    this.trip.completed = completed;
    this.trip.completed_at = trip.completed ? new Date() : null;
    this.trips = this.trips.map(arrTrip => {
      if (arrTrip === trip) {
        arrTrip = this.trip;
      }
      return arrTrip;
    });

    await this.placesApi.updateTrip(this.user.token, trip.id, {
      completed_at: completed ? new Date() : null
    });
  };

  @action
  markTripRated = async (trip, rating) => {
    this.trip.rating = rating;

    this.trips = this.trips.map(arrTrip => {
      if (arrTrip === trip) {
        arrTrip = this.trip;
      }
      return arrTrip;
    });

    await this.placesApi.updateTrip(this.user.token, trip.id, {
      rating: rating
    });
  };

  @action
  loadVideoToken = async tripId => {
    const response = await this.placesApi.loadVideoToken(
      this.user.token,
      tripId
    );
    this.videoToken = response.data.token;
  };

  @action
  addTripImage = async (tripId, image, caption) => {
    const response = await this.placesApi.addTripImage(
      this.user.token,
      tripId,
      image,
      caption
    );
    this.tripImages.push(response.data);
  };

  @action
  loadTripImages = async tripId => {
    const response = await this.placesApi.loadTripImages(
      this.user.token,
      tripId
    );
    this.tripImages = response.data;
  };
}

const singleton = new WanderersStore();
export default singleton;
