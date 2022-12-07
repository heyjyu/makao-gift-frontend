import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { userStore } from '../stores/UserStore';
import defaultTheme from '../styles/defaultTheme';
import SignUpForm from './SignUpForm';

const context = describe;

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('SignUpForm', () => {
  function renderSignUpForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <SignUpForm />
      </ThemeProvider>
    ));
  }

  beforeEach(() => {
    userStore.resetSignUpStatus();
  });

  context('when successfully signed up', () => {
    it('renders a button that navigates to the login page', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: { value: '홍길동' },
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: 'myid' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        screen.getByText('로그인하기');
      });
    });
  });

  context('with empty name', () => {
    it('renders error message', () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: 'newid' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      screen.getByText(/입력해주세요/);
    });
  });

  context('with empty name', () => {
    it('renders error message', () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: 'newid' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      screen.getByText(/입력해주세요/);
    });
  });
});
