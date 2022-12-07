import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import LoginForm from './LoginForm';

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
}));

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderLoginForm(location) {
    render((
      <ThemeProvider theme={defaultTheme}>
        <LoginForm location={location} />
      </ThemeProvider>
    ));
  }

  context('with correct username and password', () => {
    context('when previous page is not order page', () => {
      it('navigates to homepage', async () => {
        renderLoginForm({ state: {} });

        fireEvent.change(screen.getByPlaceholderText('아이디'), {
          target: { value: 'myid' },
        });

        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
          target: { value: 'Abcdef1!' },
        });

        fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

        await waitFor(() => {
          expect(navigate).toBeCalledWith('/');
        });
      });
    });

    context('when previous page is order page', () => {
      it('navigates to order page', async () => {
        renderLoginForm({ state: { previousPage: 'productDetailPage' } });

        fireEvent.change(screen.getByPlaceholderText('아이디'), {
          target: { value: 'myid' },
        });

        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
          target: { value: 'Abcdef1!' },
        });

        fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

        await waitFor(() => {
          expect(navigate).toBeCalledWith(-1);
        });
      });
    });
  });

  context('when username field is not filled', () => {
    it('renders error message', async () => {
      renderLoginForm({ state: {} });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('아이디를 입력해주세요');
      });
    });
  });

  context('when password field is not filled', () => {
    it('renders error message', async () => {
      renderLoginForm({ state: {} });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'myid' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });

  context('with incorrect username and password', () => {
    it('renders error message', async () => {
      renderLoginForm({ state: {} });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'wrongId' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
      });
    });
  });
});
