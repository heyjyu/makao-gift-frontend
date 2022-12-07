import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Home from './Home';
import defaultTheme from '../styles/defaultTheme';

describe('Home', () => {
  it('renders present image', () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <Home />
      </ThemeProvider>
    ));

    screen.getByAltText('present');
  });
});
