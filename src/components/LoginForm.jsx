/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';

export default function LoginForm({ location }) {
  const navigate = useNavigate();

  const loginFormStore = useLoginFormStore();
  const { username, password } = loginFormStore;

  const userStore = useUserStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const handleChangeUsername = (e) => {
    userStore.resetLoginStatus();
    loginFormStore.changeUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    userStore.resetLoginStatus();
    loginFormStore.changePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginFormStore.validate();

    if (!loginFormStore.isValidateSuccessful) {
      return;
    }

    const accessToken = await userStore.login({ username, password });

    if (userStore.isLoginFailed) {
      return;
    }

    setAccessToken(accessToken);

    if (location.state?.previousPage === 'productDetailPage') {
      navigate(-1);

      return;
    }

    navigate('/');
  };

  return (
    <div>
      <h1>USER LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={loginFormStore.username}
          onChange={handleChangeUsername}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginFormStore.password}
          onChange={handleChangePassword}
        />
        {loginFormStore.errorMessage
          ? <p>{loginFormStore.errorMessage}</p>
          : null}
        {userStore.isLoginFailed
          ? <p>아이디 혹은 비밀번호가 맞지 않습니다</p>
          : null}
        <button type="submit">
          로그인하기
        </button>
      </form>
      <Link to="/signup">
        회원가입
      </Link>
    </div>
  );
}
