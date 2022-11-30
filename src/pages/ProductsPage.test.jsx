/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProductsPage from './ProductsPage';

describe('ProductsPage', () => {
  it('renders message', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <ProductsPage />
      </MemoryRouter>,
    );

    screen.getByText(/마카오톡 선물하기 아이템/);
  });
});
