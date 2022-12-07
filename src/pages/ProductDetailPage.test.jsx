/* eslint-disable import/no-extraneous-dependencies */

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ProductDetailPage from './ProductDetailPage';

describe('ProductDetailPage', () => {
  it('renders button to send present', async () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    ));

    await waitFor(() => {
      screen.getByText('선물하기');
    });
  });
});
