import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
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

  function renderLoginForm() {
    render(<LoginForm />);
  }

  context('with correct username and password', () => {
    it('navigates to homepage', async () => {
      renderLoginForm();

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

  context('with incorrect username and password', () => {
    it('does not navigate to homepage', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'wrongId' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        expect(userStore.isLoginFailed).toBeTruthy();
      });
    });
  });
});
