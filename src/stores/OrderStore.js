import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.reset();
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

  async fetchOrder(id) {
    try {
      this.order = await apiService.fetchOrder(id);

      this.changeFetchOrderDetailStatus('successful');
    } catch {
      this.changeFetchOrderDetailStatus('failed');
    }
  }

  reset() {
    this.orders = [];
    this.order = null;
    this.orderStatus = '';
    this.fetchOrderDetailStatus = '';

    this.publish();
  }

  changeOrderStatus(status) {
    this.orderStatus = status;
    this.publish();
  }

  changeFetchOrderDetailStatus(status) {
    this.fetchOrderDetailStatus = status;
    this.publish();
  }

  get isOrderSuccessful() {
    return this.orderStatus === 'successful';
  }

  get isFetchOrderDetailSuccessful() {
    return this.fetchOrderDetailStatus === 'successful';
  }

  get isFetchOrderDetailFailed() {
    return this.fetchOrderDetailStatus === 'failed';
  }
}

export const orderStore = new OrderStore();
