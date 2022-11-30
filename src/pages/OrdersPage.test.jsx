/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import OrdersPage from './OrdersPage';

describe('OrdersPage', () => {
  it('renders button to send present', () => {
    render(
      <MemoryRouter initialEntries={['/orders']}>
        <OrdersPage />
      </MemoryRouter>,
    );

    screen.getByText(/내가 주문한/);
  });
});
