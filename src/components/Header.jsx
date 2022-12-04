import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';

export default function Header() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  if (!accessToken) {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">
                선물하기
              </Link>
            </li>
            <li>
              <Link to="/">
                홈
              </Link>
            </li>
            <li>
              <Link to="/products">
                스토어
              </Link>
            </li>
            <li>
              <Link to="/orders">
                주문조회
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/signup">
                회원가입
              </Link>
            </li>
            <li>
              <Link to="/login">
                로그인
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              선물하기
            </Link>
          </li>
          <li>
            <Link to="/">
              홈
            </Link>
          </li>
          <li>
            <Link to="/products">
              스토어
            </Link>
          </li>
          <li>
            <Link to="/orders">
              주문조회
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <p>
          내 잔액:
          {' '}
          {numberFormat(userStore.amount)}
          원
        </p>
      </div>
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
    </header>
  );
}
