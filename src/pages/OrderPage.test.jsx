/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { productStore } from '../stores/ProductStore';
import OrderPage from './OrderPage';

const context = describe;

describe('OrderPage', () => {
  context('when logged in', () => {
    it('renders button to send present', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      const id = 1;

      await productStore.fetchProduct(id);

      render(
        <MemoryRouter initialEntries={['/order']}>
          <OrderPage />
        </MemoryRouter>,
      );

      screen.getByText('선물하기');
    });
  });
});
