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

  async fetchProduct(id) {
    const { data } = await this.instance.get(`/products/${id}`);

    return {
      id: data.id,
      name: data.name,
      producer: data.producer,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
    };
  }

  async createUser({
    name, username, password, passwordCheck,
  }) {
    const { data } = await this.instance.post('/users', {
      name, username, password, passwordCheck,
    });

    return {
      id: data.id,
    };
  }
}

export const apiService = new ApiService();
