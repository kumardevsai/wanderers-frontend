import { observable, action } from 'mobx';

class UiStore {
  @observable showBuddyForm = false;
  @observable showAnswerCall = false;
  @observable callInProgress = false;
  @observable loginFormError = null;
  @observable signupFormErrors = null;
}

const singleton = new UiStore();
export default singleton;
