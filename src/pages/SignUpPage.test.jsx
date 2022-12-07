import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import SignUpPage from './SignUpPage';

describe('SignUpPage', () => {
  it('renders signup button', () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <SignUpPage />
      </ThemeProvider>
    ));

    screen.getByText('회원가입');
  });
});
