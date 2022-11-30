import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.product = null;
    this.count = 1;
  }

  async fetchProducts() {
    this.products = await apiService.fetchProducts();

    this.publish();
  }

  async fetchProduct(id) {
    this.product = await apiService.fetchProduct(id);

    this.publish();
  }

  countUp() {
    this.count += 1;

    this.publish();
  }

  countDown() {
    if (this.count < 2) {
      return;
    }

    this.count -= 1;

    this.publish();
  }

  reset() {
    this.count = 1;
    this.product = null;

    this.publish();
  }

  totalPrice() {
    return this.product.price * this.count;
  }
}

export const productStore = new ProductStore();
