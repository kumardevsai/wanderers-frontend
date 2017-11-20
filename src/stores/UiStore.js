import { observable, action } from 'mobx';

class UiStore {
  @observable showBuddyForm = false;
}

const singleton = new UiStore();
export default singleton;
