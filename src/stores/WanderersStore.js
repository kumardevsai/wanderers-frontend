import { observable, action } from 'mobx';
import AuthApi from '../services/AuthApi';

class WanderersStore {
  @observable user = {};

  constructor() {
    this.authApi = new AuthApi();
  }

  @action
  login = async (email, password) => {
    const response = await this.authApi.login(email, password);

    this.user = response.data;
  };
}

const singleton = new WanderersStore();
export default singleton;
