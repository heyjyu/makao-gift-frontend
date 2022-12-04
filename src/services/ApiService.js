import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    if (accessToken) {
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    }
  }

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

  async postSession({
    username, password,
  }) {
    const { data } = await this.instance.post('/session', {
      username, password,
    });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async createOrder({
    productId, count, to, address, message,
  }) {
    const { data } = await this.instance.post('/orders', {
      productId, count, to, address, message,
    });

    return {
      id: data.id,
    };
  }
}

export const apiService = new ApiService();
