import { observable, action } from 'mobx';

class WanderersStore {
  @observable user = {};

  @action
  login = (email, password) => {
    console.log(email, password);
  };
}

const singleton = new WanderersStore();
export default singleton;
