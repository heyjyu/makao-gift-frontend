/* eslint-disable import/no-extraneous-dependencies */

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import OrdersPage from './OrdersPage';

describe('OrdersPage', () => {
  it('renders button to send present', async () => {
    render(
      <MemoryRouter initialEntries={['/orders']}>
        <OrdersPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      screen.getByText(/내가 주문한 내역입니다/);
    });
  });
});
