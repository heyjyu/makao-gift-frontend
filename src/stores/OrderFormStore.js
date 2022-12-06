import Store from './Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  changeName(name) {
    this.name = name;
    this.validateName();

    this.publish();
  }

  changeAddress(address) {
    this.address = address;
    this.validateAddress();

    this.publish();
  }

  changeMessage(message) {
    this.message = message;

    this.publish();
  }

  reset() {
    this.name = '';
    this.address = '';
    this.message = '';
    this.nameErrorMessage = '';
    this.addressErrorMessage = '';

    this.publish();
  }

  validate() {
    this.validateName();
    this.validateAddress();

    this.publish();
  }

  validateName() {
    if (this.name === '') {
      this.setNameErrorMessage('성함을 입력해주세요');

      return;
    }

    const pattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,7}$/;

    if (!pattern.test(this.name)) {
      this.setNameErrorMessage('성함을 다시 확인해주세요');
      return;
    }

    this.setNameErrorMessage('');
  }

  validateAddress() {
    if (this.address === '') {
      this.setAddressErrorMessage('주소를 입력해주세요');

      return;
    }

    this.setAddressErrorMessage('');
  }

  setNameErrorMessage(message) {
    this.nameErrorMessage = message;
  }

  setAddressErrorMessage(message) {
    this.addressErrorMessage = message;
  }

  get isValidateSuccessful() {
    if (this.nameErrorMessage !== '') {
      return false;
    }

    if (this.addressErrorMessage !== '') {
      return false;
    }

    return true;
  }
}

export const orderFormStore = new OrderFormStore();
