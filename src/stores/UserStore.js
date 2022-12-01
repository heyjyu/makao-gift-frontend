import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.amount = 0;
    this.signUpStatus = '';
  }

  async signUp({
    name, username, password, passwordCheck,
  }) {
    this.changeSignUpStatus('processing');

    try {
      const { id } = await apiService.createUser({
        name, username, password, passwordCheck,
      });

      this.changeSignUpStatus('successful');

      return id;
    } catch {
      this.changeSignUpStatus('failed');
    }
  }

  changeSignUpStatus(status) {
    this.signUpStatus = status;
    this.publish();
  }

  resetSignUpStatus() {
    this.signUpStatus = '';
    this.publish();
  }

  get isSignUpSuccessful() {
    return this.signUpStatus === 'successful';
  }

  get isSignUpFailed() {
    return this.signUpStatus === 'failed';
  }
}

export const userStore = new UserStore();
