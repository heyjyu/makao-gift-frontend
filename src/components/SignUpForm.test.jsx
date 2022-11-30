import { render, fireEvent, screen } from '@testing-library/react';
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
    render(<SignUpForm />);
  }

  context('when successfully signed up', () => {
    it('renders a button that navigates to the login page', () => {
      // TODO msw 사용하기
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: '홍길동',
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: 'newId',
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: 'Abcdef1!',
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: 'Abcdef1!',
      });

      fireEvent.click(screen.getByText('회원가입'));

      screen.getByText('로그인하기');
    });
  });

  // TODO
  // context('when failed to sign up', () => {
  //   it('does not render a button that navigates to the login page', () => {
  //     // TODO msw 사용하기
  //     renderSignUpForm();

  //     fireEvent.change(screen.getByLabelText('아이디:'), {
  //       target: 'newId',
  //     });

  //     fireEvent.change(screen.getByLabelText('비밀번호:'), {
  //       target: 'Abcdef1!',
  //     });

  //     fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
  //       target: 'Abcdef1!',
  //     });

  //     fireEvent.click(screen.getByText('회원가입'));

  //     expect(screen.queryByText('로그인하기')).toBeNull();
  //   });
  // });
});
