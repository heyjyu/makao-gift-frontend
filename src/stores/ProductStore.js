import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  async fetchProducts({ page, size }) {
    const { metadata, products } = await apiService.fetchProducts({ page, size });

    this.products = products;
    this.totalPages = metadata.totalPages;

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

  setCount(count) {
    this.count = count;

    this.publish();
  }

  reset() {
    this.products = [];
    this.totalPages = 0;
    this.product = null;
    this.count = 1;

    this.publish();
  }

  totalPrice() {
    return this.product.price * this.count;
  }
}

export const productStore = new ProductStore();
