/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
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
);

export default server;
