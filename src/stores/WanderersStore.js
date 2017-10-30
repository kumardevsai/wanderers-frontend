import { observable, action } from 'mobx';
import AuthApi from '../services/AuthApi';

class WanderersStore {
  @observable user = {};
  @observable
  viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 43.65323,
    longitude: -79.38318,
    zoom: 12
  };

  constructor() {
    this.authApi = new AuthApi();

    // ensure that there is a user & load user into state (makes it available in store)
    const session_user = sessionStorage.getItem('user');
    if (session_user) {
      this.user = JSON.parse(session_user);
    }
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
}

const singleton = new WanderersStore();
export default singleton;
