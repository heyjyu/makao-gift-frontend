import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.amount = 0;
    this.signUpStatus = '';
    this.loginStatus = '';
  }

  async signUp({
    name, username, password,
  }) {
    this.changeSignUpStatus('processing');

    try {
      const { id } = await apiService.createUser({
        name, username, password,
      });

      this.changeSignUpStatus('successful');

      return id;
    } catch {
      this.changeSignUpStatus('failed');

      return '';
    }
  }

  async login({ username, password }) {
    this.changeLoginStatus('processing');

    try {
      const { accessToken, amount } = await apiService.postSession({ username, password });

      this.amount = amount;

      this.changeLoginStatus('successful');

      return accessToken;
    } catch {
      this.changeLoginStatus('failed');

      return '';
    }
  }

  async fetchUser() {
    const { amount } = await apiService.fetchUser();

    this.amount = amount;

    this.publish();
  }

  isAffordable(amount) {
    return this.amount >= amount;
  }

  setAmount(amount) {
    this.amount = amount;
    this.publish();
  }

  reduceAmount(amount) {
    this.amount -= amount;
    this.publish();
  }

  changeSignUpStatus(status) {
    this.signUpStatus = status;
    this.publish();
  }

  resetSignUpStatus() {
    this.signUpStatus = '';
    this.publish();
  }

  changeLoginStatus(status) {
    this.loginStatus = status;
    this.publish();
  }

  resetLoginStatus() {
    this.loginStatus = '';
    this.publish();
  }

  get isSignUpSuccessful() {
    return this.signUpStatus === 'successful';
  }

  get isSignUpFailed() {
    return this.signUpStatus === 'failed';
  }

  get isLoginSuccessful() {
    return this.loginStatus === 'successful';
  }

  get isLoginFailed() {
    return this.loginStatus === 'failed';
  }
}

export const userStore = new UserStore();
