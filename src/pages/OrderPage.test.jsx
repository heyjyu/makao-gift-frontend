/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { productStore } from '../stores/ProductStore';
import defaultTheme from '../styles/defaultTheme';
import OrderPage from './OrderPage';

const context = describe;

describe('OrderPage', () => {
  context('when logged in', () => {
    it('renders button to send present', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      const id = 1;

      await productStore.fetchProduct(id);

      render((
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={['/order']}>
            <OrderPage />
          </MemoryRouter>
        </ThemeProvider>
      ));

      screen.getByText('선물하기');
    });
  });
});
