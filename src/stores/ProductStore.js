import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.selectedProduct = null;
  }

  async fetchProducts() {
    this.products = await apiService.fetchProducts();

    this.publish();
  }
}

export const productStore = new ProductStore();
