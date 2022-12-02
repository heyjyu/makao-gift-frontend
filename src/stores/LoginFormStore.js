import Store from './Store';

export default class LoginFormStore extends Store {
  constructor() {
    super();

    this.username = '';
    this.password = '';
  }

  changeUsername(username) {
    this.username = username;

    this.publish();
  }

  changePassword(password) {
    this.password = password;

    this.publish();
  }

  reset() {
    this.username = '';
    this.password = '';

    this.publish();
  }
}

export const loginFormStore = new LoginFormStore();
