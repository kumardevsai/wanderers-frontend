import { observable, action } from 'mobx';
import AuthApi from '../services/AuthApi';
import PlacesApi from '../services/PlacesApi';

class WanderersStore {
  @observable user = {};

  @observable
  viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 43.65323,
    longitude: -79.38318,
    zoom: 13
  };

  @observable popupPlace = null;

  @observable places = [];

  constructor() {
    this.authApi = new AuthApi();
    this.placesApi = new PlacesApi();

    // ensure that there is a user & load user into state (makes it available in store)
    const session_user = sessionStorage.getItem('user');
    if (session_user) {
      this.user = JSON.parse(session_user);
    }

    this.searchPlaces(43.65323, -79.38318);
  }

  @action
  login = async (email, password) => {
    const response = await this.authApi.login(email, password);

    this.user = response.data;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  };

  @action
  signup = async (name, email, password, image) => {
    const response = await this.authApi.signup(name, email, password, image);

    this.user = response.data;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  };

  @action
  searchPlaces = async (lat, lon) => {
    this.viewport.latitude = lat;
    this.viewport.longitude = lon;
    this.viewport.zoom = 16;

    const response = await this.placesApi.search('abc', lat, lon);

    this.places = response.data;
  };

  @action
  updatePopupPlace = place => {
    this.popupPlace = place;
  };
}

const singleton = new WanderersStore();
export default singleton;
