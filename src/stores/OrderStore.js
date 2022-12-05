import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.orders = [];
    this.order = null;
    this.orderStatus = '';
  }

  async orderItem({
    productId, count, to, address, message,
  }) {
    this.changeOrderStatus('processing');

    try {
      await apiService.createOrder({
        productId, count, to, address, message,
      });

      this.changeOrderStatus('successful');
    } catch {
      this.changeOrderStatus('failed');
    }
  }

  async fetchOrders() {
    this.orders = await apiService.fetchOrders();

    this.publish();
  }

  reset() {
    this.orders = [];
    this.order = null;
    this.orderStatus = '';

    this.publish();
  }

  changeOrderStatus(status) {
    this.orderStatus = status;
    this.publish();
  }

  get isOrderSuccessful() {
    return this.orderStatus === 'successful';
  }
}

export const orderStore = new OrderStore();
