import { Link } from 'react-router-dom';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';

export default function SignUpForm() {
  const userStore = useUserStore();
  const signUpFormStore = useSignUpFormStore();
  const {
    name, username, password, passwordCheck,
  } = signUpFormStore;

  const handleSubmit = (e) => {
    e.preventDefault();

    signUpFormStore.validate();

    if (signUpFormStore.isValidateSuccessful) {
      userStore.signUp({
        name, username, password, passwordCheck,
      });
    }
  };

  if (userStore.isSignUpSuccessful) {
    return (
      <div>
        <h1>회원가입 완료</h1>
        <p>마카오 선물하기 회원가입이 완료되었습니다.</p>
        <p>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</p>
        <Link to="/login">
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input-name">
            이름:
          </label>
          <input
            type="text"
            name="name"
            id="input-name"
            value={signUpFormStore.name}
            onChange={(e) => signUpFormStore.changeName(e.target.value)}
          />
          {signUpFormStore.nameErrorMessage
            ? <p>{signUpFormStore.nameErrorMessage}</p>
            : <p>3~7자까지 한글만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-username">
            아이디:
          </label>
          <input
            type="text"
            name="username"
            id="input-username"
            value={signUpFormStore.username}
            onChange={(e) => signUpFormStore.changeUsername(e.target.value)}
          />
          {signUpFormStore.usernameErrorMessage
            ? <p>{signUpFormStore.usernameErrorMessage}</p>
            : <p>영문소문자/숫자, 4~16자만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-password">
            비밀번호:
          </label>
          <input
            type="password"
            name="password"
            id="input-password"
            value={signUpFormStore.password}
            onChange={(e) => signUpFormStore.changePassword(e.target.value)}
          />
          {signUpFormStore.passwordErrorMessage
            ? <p>{signUpFormStore.passwordErrorMessage}</p>
            : <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>}
        </div>
        <div>
          <label htmlFor="input-password-check">
            비밀번호 확인:
          </label>
          <input
            type="password"
            name="password-check"
            id="input-password-check"
            value={signUpFormStore.passwordCheck}
            onChange={(e) => signUpFormStore.changePasswordCheck(e.target.value)}
          />
          {signUpFormStore.passwordCheckErrorMessage
            ? <p>{signUpFormStore.passwordCheckErrorMessage}</p>
            : null}
        </div>
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
