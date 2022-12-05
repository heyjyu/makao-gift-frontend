/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(ctx.json({
    name: '홍길동',
    amount: 50000,
  }))),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 2,
        name: '클래식 라인드 클로그 203591-060',
        producer: '크록스',
        price: 33520,
        description: '클래식 라인드 클로그 203591-060',
        imageUrl: 'https://img.danawa.com/prod_img/500000/038/578/img/4578038_1.jpg??shrink=360:360&_v=20221130165456',
      },
      {
        id: 1,
        name: '갈비천왕+콜라1.25L',
        producer: '굽네치킨',
        price: 10000,
        description: '갈비천왕+콜라1.25L',
        imageUrl: 'https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg',
      },
    ],
  }))),

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    name: '갈비천왕+콜라1.25L',
    producer: '굽네치킨',
    price: 10000,
    description: '갈비천왕+콜라1.25L',
    imageUrl: 'https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg',
  }))),

  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      name, username, password, passwordCheck,
    } = await req.json();

    if (name === '홍길동'
    && username === 'myid'
    && password === 'Abcdef1!'
    && passwordCheck === 'Abcdef1!') {
      return res(
        ctx.json({
          id: 1,
          name: '홍길동',
          username: 'myid',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const {
      username, password,
    } = await req.json();

    if (username === 'myid'
    && password === 'Abcdef1!') {
      return res(
        ctx.json({
          accessToken: 'ACCESS.TOKEN',
          name: '홍길동',
          amount: 50000,
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const {
      productId, count, to, address,
    } = await req.json();

    if (productId && count > 0 && to && address) {
      return res(
        ctx.json({
          id: 1,
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(ctx.json({
    orders: [
      {
        address: '서울시 행복구 행복동',
        count: 1,
        createdAt: '2022-12-05T14:27:14.931659',
        id: 1,
        message: '행복하세요~',
        product: {
          description: '갈비천왕+콜라1.25L',
          id: 1,
          imageUrl: 'https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg',
          name: '갈비천왕+콜라1.25L',
          price: 10000,
          producer: '굽네치킨',
        },
        to: '동길홍',
        totalPrice: 10000,
      },
      {
        address: '서울시 행복구 행복동',
        count: 2,
        createdAt: '2022-12-05T14:27:14.931659',
        id: 2,
        message: '행복하세요~',
        product: {
          description: '갈비천왕+콜라1.25L',
          id: 1,
          imageUrl: 'https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg',
          name: '갈비천왕+콜라1.25L',
          price: 10000,
          producer: '굽네치킨',
        },
        to: '동길홍',
        totalPrice: 20000,
      },
    ],
  }))),

  rest.get(`${baseUrl}/orders/1`, async (req, res, ctx) => {
    const token = req.headers.get('authorization').substring('Bearer '.length);

    if (token === 'ACCESS.TOKEN') {
      return res(ctx.json({
        address: '서울시 행복구 행복동',
        count: 1,
        createdAt: '2022-12-05T14:27:14.931659',
        id: 1,
        message: '행복하세요~',
        product: {
          description: '갈비천왕+콜라1.25L',
          id: 1,
          imageUrl: 'https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg',
          name: '갈비천왕+콜라1.25L',
          price: 10000,
          producer: '굽네치킨',
        },
        to: '동길홍',
        totalPrice: 10000,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),
);

export default server;
