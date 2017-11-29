import { observable } from 'mobx';

class UiStore {
  @observable showBuddyForm = false;
  @observable showAnswerCall = false;
  @observable callInProgress = false;
  @observable loginFormError = null;
  @observable signupFormErrors = null;

  @observable visualImageVisible = false;
  @observable visualImagePositionX = null;
  @observable visualImagePositionY = null;
  @observable visualImageStop = null;
}

const singleton = new UiStore();
export default singleton;
