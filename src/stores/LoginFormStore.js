import Store from './Store';

export default class LoginFormStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  changeUsername(username) {
    this.username = username;
    this.validateUsername();

    this.publish();
  }

  changePassword(password) {
    this.password = password;
    this.validatePassword();

    this.publish();
  }

  reset() {
    this.username = '';
    this.password = '';
    this.errors = {};

    this.publish();
  }

  validate() {
    this.errors = {};

    this.validateUsername();

    this.validatePassword();

    if (this.username === '' && this.password === '') {
      this.errors = { username: true, password: true };
    }

    this.publish();
  }

  validateUsername() {
    if (this.username === '') {
      this.errors = { username: true };
    }
  }

  validatePassword() {
    if (this.password === '') {
      this.errors = { password: true };
    }
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
