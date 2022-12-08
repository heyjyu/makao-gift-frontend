import { render, screen } from '@testing-library/react';
import Banner from './Banner';

describe('Banner', () => {
  it('renders message', () => {
    render(<Banner />);

    screen.getByText(/마카오톡 선물하기 아이템/);
  });
});
