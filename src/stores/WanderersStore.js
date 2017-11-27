import { observable, action } from 'mobx';

import Hosts from '../services/Hosts';
import AuthApi from '../services/AuthApi';
import PlacesApi from '../services/PlacesApi';

import ActionCable from 'actioncable';

class WanderersStore {
  @observable user = null;

  @observable
  viewport = {
    width: window.innerWidth,
    height: window.innerHeight * 0.75,
    latitude: 43.65323,
    longitude: -79.38318,
    zoom: 13
  };

  @observable popupPlace = null;
  @observable places = [];
  @observable trips = [];
  @observable trip = null;
  @observable messages = [];

  constructor() {
    this.authApi = new AuthApi();
    this.placesApi = new PlacesApi();

    this.cable = ActionCable.createConsumer(`${Hosts.placesHost()}/cable`);

    // ensure that there is a user & load user into state (makes it available in store)
    const session_user = sessionStorage.getItem('user');
    if (session_user) {
      this.user = JSON.parse(session_user);
    }

    if (this.user) {
      this.searchPlaces(43.65323, -79.38318);
    }
  }

  @action
  login = async (email, password) => {
    const response = await this.authApi.login(email, password);

    this.user = response.data;
    sessionStorage.setItem('user', JSON.stringify(this.user));

    return response;
  };

  @action
  signup = async (name, email, password, image) => {
    const response = await this.authApi.signup(name, email, password, image);

    this.user = response.data;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    return response;
  };

  @action
  searchPlaces = async (lat, lon) => {
    this.viewport.latitude = lat;
    this.viewport.longitude = lon;
    this.viewport.zoom = 16;

    const response = await this.placesApi.search(this.user.token, lat, lon);

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

  // Chat stuff
  @action
  setupSubscription = tripId => {
    this.subscription = this.cable.subscriptions.create(
      {
        channel: 'ChatChannel',
        trip_id: tripId
      },
      {
        received: message => {
          this.messages.push(message);
        },
        talk: (text, userId) => {
          this.subscription.perform('talk', {
            text: text,
            user_id: userId
          });
        }
      }
    );
  };

  @action
  sendMessage = text => {
    this.subscription.talk(text, this.user.id);
  };
}

const singleton = new WanderersStore();
export default singleton;
