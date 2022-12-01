import Store from './Store';

export default class SignUpFormStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
  }

  changeName(name) {
    this.name = name;

    this.publish();
  }

  changeUsername(username) {
    this.username = username;

    this.publish();
  }

  changePassword(password) {
    this.password = password;

    this.publish();
  }

  changePasswordCheck(passwordCheck) {
    this.passwordCheck = passwordCheck;

    this.publish();
  }
}

export const signUpFormStore = new SignUpFormStore();
