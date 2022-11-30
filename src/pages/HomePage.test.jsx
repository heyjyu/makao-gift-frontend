import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders message', () => {
    render(<HomePage />);

    screen.getByText('아이템을 전하세요');
  });
});
