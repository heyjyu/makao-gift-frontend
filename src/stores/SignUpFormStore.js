import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SignUpFormStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  changeName(name) {
    this.name = name;
    this.validateName();

    this.publish();
  }

  async changeUsername(username) {
    this.username = username;
    await this.validateUsername();

    this.publish();
  }

  changePassword(password) {
    this.password = password;
    this.validatePassword();

    this.publish();
  }

  changePasswordCheck(passwordCheck) {
    this.passwordCheck = passwordCheck;
    this.validatePasswordCheck();

    this.publish();
  }

  reset() {
    this.name = '';
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
    this.nameErrorMessage = '';
    this.usernameErrorMessage = '';
    this.passwordErrorMessage = '';
    this.passwordCheckErrorMessage = '';

    this.publish();
  }

  validate() {
    this.validateName();
    this.validateUsername();
    this.validatePassword();
    this.validatePasswordCheck();

    this.publish();
  }

  validateName() {
    if (this.name === '') {
      this.setNameErrorMessage('이름을 입력해주세요');

      return;
    }

    const pattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,7}$/;

    if (!pattern.test(this.name)) {
      this.setNameErrorMessage('이름을 다시 확인해주세요');
      return;
    }

    this.setNameErrorMessage('');
  }

  async validateUsername() {
    if (this.username === '') {
      this.setUsernameErrorMessage('아이디를 입력해주세요');

      return;
    }

    const pattern = /^[a-z|0-9]{4,16}$/;

    if (!pattern.test(this.username)) {
      this.setUsernameErrorMessage('아이디를 다시 확인해주세요');
      return;
    }

    const count = await apiService.countUser(this.username);

    if (count !== 0) {
      this.setUsernameErrorMessage('해당 아이디는 사용할 수 없습니다');

      return;
    }

    this.setUsernameErrorMessage('');
  }

  validatePassword() {
    if (this.password === '') {
      this.setPasswordErrorMessage('비밀번호를 입력해주세요');

      return;
    }

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!pattern.test(this.password)) {
      this.setPasswordErrorMessage('비밀번호를 다시 확인해주세요');
      return;
    }

    this.setPasswordErrorMessage('');
  }

  validatePasswordCheck() {
    if (this.passwordCheck === '') {
      this.setPasswordCheckErrorMessage('비밀번호를 입력해주세요');

      return;
    }

    if (this.passwordCheck !== this.password) {
      this.setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다');

      return;
    }

    this.setPasswordCheckErrorMessage('');
  }

  setNameErrorMessage(message) {
    this.nameErrorMessage = message;
  }

  setUsernameErrorMessage(message) {
    this.usernameErrorMessage = message;
  }

  setPasswordErrorMessage(message) {
    this.passwordErrorMessage = message;
  }

  setPasswordCheckErrorMessage(message) {
    this.passwordCheckErrorMessage = message;
  }

  get isValidateSuccessful() {
    if (this.nameErrorMessage !== '') {
      return false;
    }

    if (this.usernameErrorMessage !== '') {
      return false;
    }

    if (this.passwordErrorMessage !== '') {
      return false;
    }

    if (this.passwordCheckErrorMessage !== '') {
      return false;
    }

    return true;
  }
}

export const signUpFormStore = new SignUpFormStore();
