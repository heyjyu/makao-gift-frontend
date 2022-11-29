import { render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';

describe('SignUpPage', () => {
  it('renders signup button', () => {
    render(<SignUpPage />);

    screen.getByText('회원가입');
  });
});
