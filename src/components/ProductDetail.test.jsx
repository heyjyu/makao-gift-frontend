import { fireEvent, render, screen } from '@testing-library/react';
import { productStore } from '../stores/ProductStore';
import { userStore } from '../stores/UserStore';
import ProductDetail from './ProductDetail';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderProducts() {
    render((
      <ProductDetail />
    ));
  }

  it('renders product detail', async () => {
    const id = 1;

    await productStore.fetchProduct(id);
    renderProducts();

    screen.getByText(1);
    screen.getAllByText('갈비천왕+콜라1.25L');
    screen.getAllByText('10,000원');
    screen.getByText('굽네치킨');
    screen.getByText('선물하기');
  });

  context('when "선물하기" button is clicked', () => {
    context('when logged out', () => {
      it('navigates to login page', async () => {
        const id = 1;

        await productStore.fetchProduct(id);
        renderProducts();

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith(
          '/login',
          { state: { previousPage: 'productDetailPage' } },
        );
        expect(navigate).not.toBeCalledWith('/order');
      });
    });

    context('when logged in', () => {
      it('navigates to order page', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
        userStore.setAmount(50000);

        const id = 1;

        await productStore.fetchProduct(id);
        renderProducts();

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith('/order');
      });
    });
  });
});
