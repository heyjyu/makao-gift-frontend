/* eslint-disable import/no-extraneous-dependencies */

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { apiService } from '../services/ApiService';
import { orderStore } from '../stores/OrderStore';
import OrderDetailPage from './OrderDetailPage';

describe('OrderDetailPage', () => {
  it('renders image of the ordered item', async () => {
    apiService.setAccessToken('ACCESS.TOKEN');

    const id = 1;

    await orderStore.fetchOrder(id);

    render(
      <MemoryRouter initialEntries={['/orders/1']}>
        <OrderDetailPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      screen.getByRole('img');
    });
  });
});
