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
  @observable notification = null;
  @observable showNotification = false;

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
  notify = str => {
    this.notification = str;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  };

  @action
  notifyVideoJoin = () => {
    this.subscription.perform('video_join', {
      user_id: this.user.id,
      user_name: this.user.name
    });
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
  loadTrip = async uuid => {
    const response = await this.placesApi.loadTrip(this.user.token, uuid);
    // set trip when response is back
    this.trip = response.data;
    this.setupSubscription(uuid);
    this.loadMessages(uuid);
    this.loadBuddies(uuid);
    this.loadTripImages(uuid);
    await this.loadVideoToken(uuid);
    await this.loadStops(uuid);

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
    await this.placesApi.sendInvitation(this.user.token, email, this.trip.uuid);
    this.notify('Message sent! ✉️');
  };

  // call to placesApi to create buddy
  @action
  joinTrip = async (tripUuid, history) => {
    await this.placesApi.joinTrip(this.user.token, tripUuid);
    history.push(`/trips/${tripUuid}`);
  };

  // Real time stuff events for chat and stop
  @action
  setupSubscription = tripUuid => {
    this.subscription = this.cable.subscriptions.create(
      {
        channel: 'TripChannel',
        trip_uuid: tripUuid
      },
      {
        received: this.conditionalBroadcast
      }
    );
  };

  @action
  conditionalBroadcast = ({ type, data }) => {
    // new message comes from talk method in trip channel
    if (type === 'new_message') {
      this.messages.push(data);
      this.messages = [...new Set([...this.messages])];
    } else if (type === 'new_stop') {
      this.stops.push(data);
      this.notify('New Stop Added! 🛵');
    } else if (type === 'remove_stop') {
      this.stops = this.stops.filter(stop => stop.id !== data);
      this.notify('Stop Removed! 🙀');
    } else if (type === 'video_join') {
      this.notify(`${data.user_name} has joined the video chat 🤘`);
    }
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
  loadMessages = async tripUuid => {
    const response = await this.placesApi.loadMessages(
      this.user.token,
      tripUuid
    );
    this.messages = response.data;
  };

  @action
  loadBuddies = async tripUuid => {
    const response = await this.placesApi.loadBuddies(
      this.user.token,
      tripUuid
    );
    this.buddies = response.data;
  };

  @action
  addStopToTrip = async placeId => {
    await this.placesApi.addStopToTrip(
      this.user.token,
      this.trip.uuid,
      placeId
    );
  };

  @action
  removeStopFromTrip = async stopId => {
    await this.placesApi.removeStopFromTrip(
      this.user.token,
      this.trip.uuid,
      stopId
    );
  };

  @action
  loadStops = async tripUuid => {
    const response = await this.placesApi.loadStops(this.user.token, tripUuid);
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

    await this.placesApi.updateTrip(this.user.token, trip.uuid, {
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

    await this.placesApi.updateTrip(this.user.token, trip.uuid, {
      rating: rating
    });
  };

  @action
  loadVideoToken = async tripUuid => {
    const response = await this.placesApi.loadVideoToken(
      this.user.token,
      tripUuid
    );
    this.videoToken = response.data.token;
  };

  @action
  addTripImage = async (tripUuid, image, caption) => {
    const response = await this.placesApi.addTripImage(
      this.user.token,
      tripUuid,
      image,
      caption
    );
    this.tripImages.push(response.data);
    this.notify('Image added! 📷');
  };

  @action
  loadTripImages = async tripUuid => {
    const response = await this.placesApi.loadTripImages(
      this.user.token,
      tripUuid
    );
    this.tripImages = response.data;
  };
}

const singleton = new WanderersStore();
export default singleton;
