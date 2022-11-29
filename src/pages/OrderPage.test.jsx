/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import OrderPage from './OrderPage';

describe('OrderPage', () => {
  it('renders button to send present', () => {
    render(
      <MemoryRouter initialEntries={['/order']}>
        <OrderPage />
      </MemoryRouter>,
    );

    screen.getByText('선물하기');
  });
});
