import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import LoginPage from './LoginPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
  useLocation: jest.fn(),
}));

describe('LoginPage', () => {
  it('renders login button', () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <LoginPage />
      </ThemeProvider>
    ));

    screen.getByText('로그인하기');
  });
});
