import { observable, action } from 'mobx';

class WanderersStore {
  @observable user = {};
}

const singleton = new WanderersStore();
export default singleton;
