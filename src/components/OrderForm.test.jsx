import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import OrderFormStore from '../stores/OrderFormStore';
import OrderStore from '../stores/OrderStore';
import { productStore } from '../stores/ProductStore';
import defaultTheme from '../styles/defaultTheme';
import OrderForm from './OrderForm';

const navigate = jest.fn();

const context = describe;

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/useOrderFormStore', () => () => new OrderFormStore());
jest.mock('../hooks/useOrderStore', () => () => new OrderStore());

describe('OrderForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderOrderForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <OrderForm />
      </ThemeProvider>
    ));
  }

  context('when logged out', () => {
    it('displays "로그인을 해주세요" message', async () => {
      const id = 1;

      await productStore.fetchProduct(id);

      renderOrderForm();
    });
  });

  context('when logged in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    context('when successfully ordered the item', () => {
      it('navigates to orders page', async () => {
        const id = 1;

        await productStore.fetchProduct(id);

        renderOrderForm();

        fireEvent.change(screen.getByLabelText('받는 분 성함'), {
          target: { value: '동길홍' },
        });

        fireEvent.change(screen.getByLabelText('받는 분 주소'), {
          target: { value: '서울시 행복구 행복동' },
        });

        fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
          target: { value: '행복하세요~' },
        });

        fireEvent.click(screen.getByText('선물하기'));

        await waitFor(() => {
          expect(navigate).toBeCalledWith('/orders');
        });
      });
    });

    context('when name field is not filled', () => {
      it('does not navigate to orders page', async () => {
        const id = 1;

        await productStore.fetchProduct(id);

        renderOrderForm();

        fireEvent.change(screen.getByLabelText('받는 분 주소'), {
          target: { value: '서울시 행복구 행복동' },
        });

        fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
          target: { value: '행복하세요~' },
        });

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).not.toBeCalledWith('/orders');
      });
    });

    context('when address field is not filled', () => {
      it('does not navigate to orders page', async () => {
        const id = 1;

        await productStore.fetchProduct(id);

        renderOrderForm();

        fireEvent.change(screen.getByLabelText('받는 분 성함'), {
          target: { value: '동길홍' },
        });

        fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
          target: { value: '행복하세요~' },
        });

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).not.toBeCalledWith('/orders');
      });
    });
  });
});
