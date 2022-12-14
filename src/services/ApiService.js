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

  async fetchUser() {
    const { data } = await this.instance.get('/users/me');

    return {
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchProducts({ page = 1, size }) {
    const { data } = await this.instance.get(`/products?page=${page}&size=${size}`);

    const { metadata, products } = data;

    return {
      metadata,
      products,
    };
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
    name, username, password,
  }) {
    const { data } = await this.instance.post('/users', {
      name, username, password,
    });

    return {
      id: data.id,
    };
  }

  async countUser(username) {
    const { data } = await this.instance.get(`/users?countOnly=true&username=${username}`);

    return data.count;
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
    productId, count, unitPrice, to, address, message,
  }) {
    const { data } = await this.instance.post('/orders', {
      productId, count, unitPrice, to, address, message,
    });

    return {
      id: data.id,
    };
  }

  async fetchOrders({ page = 1, size }) {
    const { data } = await this.instance.get(`/orders?page=${page}&size=${size}`);

    const { metadata, orders } = data;

    return {
      metadata,
      orders,
    };
  }

  async fetchOrder(id) {
    const { data } = await this.instance.get(`/orders/${id}`);

    return {
      id: data.id,
      name: data.product.name,
      producer: data.product.producer,
      address: data.address,
      count: data.count,
      totalPrice: data.totalPrice,
      createdAt: data.createdAt,
      to: data.to,
      message: data.message,
      imageUrl: data.product.imageUrl,
    };
  }
}

export const apiService = new ApiService();
