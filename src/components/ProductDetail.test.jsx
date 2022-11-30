import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { productStore } from '../stores/ProductStore';
import ProductDetail from './ProductDetail';

describe('ProductDetail', () => {
  function renderProducts() {
    render((
      <MemoryRouter initialEntries={['/products/1']}>
        <ProductDetail />
      </MemoryRouter>
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
});
