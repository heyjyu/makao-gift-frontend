/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProductDetailPage from './ProductDetailPage';

describe('ProductDetailPage', () => {
  it('renders button to send present', () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    screen.getByText(/선물하기/);
  });
});
