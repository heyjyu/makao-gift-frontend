import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { productStore } from '../stores/ProductStore';
import Products from './Products';

const context = describe;

describe('Products', () => {
  function renderProducts() {
    render((
      <MemoryRouter initialEntries={['/products']}>
        <Products />
      </MemoryRouter>
    ));
  }

  context('without product', () => {
    it('renders "상품이 존재하지 않습니다" message', () => {
      renderProducts();

      screen.getByText('상품이 존재하지 않습니다');
    });
  });

  context('with product', () => {
    it('renders "상품이 존재하지 않습니다" message', async () => {
      await productStore.fetchProducts({ page: 1, size: 8 });
      renderProducts();

      screen.getByText('갈비천왕+콜라1.25L');
      screen.getByText('클래식 라인드 클로그 203591-060');
    });
  });
});
