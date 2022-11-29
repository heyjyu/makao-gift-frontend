import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders present image', () => {
    render(<Home />);

    screen.getByAltText('present');
  });
});
