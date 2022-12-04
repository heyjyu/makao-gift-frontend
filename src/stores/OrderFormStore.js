import Store from './Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.address = '';
    this.message = '';
  }

  changeName(name) {
    this.name = name;

    this.publish();
  }

  changeAddress(address) {
    this.address = address;

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

    this.publish();
  }

  // TODO validate using other method
  get isValidateSuccessful() {
    if (this.name === '') {
      return false;
    }
    return true;
  }
}

export const orderFormStore = new OrderFormStore();
