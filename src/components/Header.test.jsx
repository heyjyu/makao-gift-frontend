import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

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
  useLocation() {
    return {
      pathname: {
        startsWith: jest.fn(),
      },
    };
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render((
      <Header />
    ));
  }

  it('renders links', () => {
    renderHeader();

    screen.getByText('홈');
    screen.getByText('스토어');
    screen.getByText('주문조회');
  });

  context('when logged out', () => {
    it('renders login button', () => {
      renderHeader();

      screen.getByText(/로그인/);
    });

    it('renders signup button', () => {
      renderHeader();

      screen.getByText(/회원가입/);
    });
  });

  context('when logged in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('renders logout button', () => {
      renderHeader();

      screen.getByText(/로그아웃/);
    });

    context('when logout button is clicked', () => {
      it('redirects to home page', () => {
        renderHeader();

        fireEvent.click(screen.getByText('로그아웃'));

        expect(navigate).toBeCalledWith('/');
      });
    });

    it('renders amount', () => {
      renderHeader();

      screen.getByText(/내 잔액/);
    });
  });
});
