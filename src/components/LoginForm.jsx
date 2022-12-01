import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';

export default function LoginForm() {
  const navigate = useNavigate();

  const loginFormStore = useLoginFormStore();
  const { username, password } = loginFormStore;

  const userStore = useUserStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = await userStore.login({ username, password });

    if (userStore.isLoginSuccessful) {
      setAccessToken(accessToken);

      navigate('/');
    }
  };

  return (
    <div>
      <h1>USER LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          onChange={(e) => loginFormStore.changeUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={(e) => loginFormStore.changePassword(e.target.value)}
        />
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
