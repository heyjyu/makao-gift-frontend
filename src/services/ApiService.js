import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  instance = axios.create({
    baseURL: baseUrl,
  });

  async fetchProducts() {
    const { data } = await this.instance.get('/products');

    const { products } = data;

    return products;
  }
}

export const apiService = new ApiService();
