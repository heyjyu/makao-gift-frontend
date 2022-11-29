import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // navigate to homepage when logged in
    navigate('/');
    e.preventDefault();
  };

  return (
    <div>
      <h1>USER LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="아이디" />
        <input type="text" name="password" placeholder="비밀번호" />
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
