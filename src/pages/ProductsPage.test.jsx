/* eslint-disable import/no-extraneous-dependencies */

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProductsPage from './ProductsPage';

describe('ProductsPage', () => {
  it('renders message', async () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <ProductsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      screen.getByText(/갈비천왕/);
    });
  });
});
