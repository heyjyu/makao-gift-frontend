import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
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
  beforeEach(() => {
    userStore.resetSignUpStatus();
  });

  function renderSignUpForm() {
    render(<SignUpForm />);
  }

  context('when successfully signed up', () => {
    it('renders a button that navigates to the login page', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: { value: '홍길동' },
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: 'myId' },
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

  context('when failed to sign up', () => {
    it('does not render a button that navigates to the login page', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: 'newId' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        expect(userStore.signUpStatus).toBe('failed');
      });
    });
  });
});
