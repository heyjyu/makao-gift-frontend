/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import OrderDetailPage from './OrderDetailPage';

describe('OrderDetailPage', () => {
  it('renders image of the ordered item', () => {
    render(
      <MemoryRouter initialEntries={['/orders/1']}>
        <OrderDetailPage />
      </MemoryRouter>,
    );

    screen.getByRole('img');
  });
});
