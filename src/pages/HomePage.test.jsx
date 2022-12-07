import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HomePage from './HomePage';
import defaultTheme from '../styles/defaultTheme';

describe('HomePage', () => {
  it('renders message', () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <HomePage />
      </ThemeProvider>
    ));

    screen.getByText('아이템을 전하세요');
  });
});
