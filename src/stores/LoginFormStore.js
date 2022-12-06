import Store from './Store';

export default class LoginFormStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  changeUsername(username) {
    this.username = username;
    this.validate();

    this.publish();
  }

  changePassword(password) {
    this.password = password;
    this.validate();

    this.publish();
  }

  reset() {
    this.username = '';
    this.password = '';
    this.errors = {};

    this.publish();
  }

  validate() {
    if (this.username === '' && this.password === '') {
      this.errors = { username: true, password: true };
      this.publish();

      return;
    }

    if (this.username === '') {
      this.errors = { username: true };
      this.publish();

      return;
    }

    if (this.password === '') {
      this.errors = { password: true };
      this.publish();

      return;
    }

    this.errors = {};
    this.publish();
  }

  setErrorMessage(message) {
    this.errorMessage = message;
  }

  get errorMessage() {
    if (this.errors.username && this.errors.password) {
      return '아이디와 비밀번호를 입력해주세요';
    }

    if (this.errors.username) {
      return '아이디를 입력해주세요';
    }

    if (this.errors.password) {
      return '비밀번호를 입력해주세요';
    }

    return '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const loginFormStore = new LoginFormStore();
