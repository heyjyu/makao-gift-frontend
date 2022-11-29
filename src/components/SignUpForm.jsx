import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUpForm() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    // TODO 회원가입 상태에 따라 성공하면 로그인하기 버튼 보여주기
    setSuccess(true);
    e.preventDefault();
  };

  if (!success) {
    return (
      <div>
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="input-name">
              이름:
            </label>
            <input type="text" name="name" id="input-name" />
          </div>
          <div>
            <label htmlFor="input-username">
              아이디:
            </label>
            <input type="text" name="username" id="input-username" />
          </div>
          <div>
            <label htmlFor="input-password">
              비밀번호:
            </label>
            <input type="text" name="password" id="input-password" />
          </div>
          <div>
            <label htmlFor="input-password-check">
              비밀번호 확인:
            </label>
            <input type="text" name="password-check" id="input-password-check" />
          </div>
          <button type="submit">
            회원가입
          </button>
        </form>
      </div>
    );
  }

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
