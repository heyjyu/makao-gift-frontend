import { render, screen, waitFor } from '@testing-library/react';
import Orders from './Orders';

let orderStore;

jest.mock('../hooks/useOrderStore', () => () => orderStore);

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
  useLocation() {
    return {};
  },
  useSearchParams() {
    return [{ get: jest.fn() }];
  },
}));

const context = describe;

describe('Orders', () => {
  function renderOrders() {
    render(
      <Orders />,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when logged out', () => {
    it('navigates to login page', async () => {
      orderStore = {
        orders: [],
      };

      renderOrders();

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/login');
      });
    });
  });

  context('with orders', () => {
    it('renders orders', async () => {
      orderStore = {
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
      };

      renderOrders();

      expect(screen.queryAllByText('굽네치킨').length).toBe(2);
    });
  });

  context('without orders', () => {
    it('renders "내가 주문한 내역이 없습니다" message', () => {
      orderStore = {
        orders: [],
      };

      renderOrders();

      screen.getByText('내가 주문한 내역이 없습니다');
    });
  });
});
