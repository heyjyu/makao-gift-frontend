/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';
import Button from './ui/Button';
import Title from './ui/Title';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25em;
  height: 3.75em;
  margin-top: 2.5em;
`;

const Input = styled.input`
  font-size: 1em;
  font-weight: 400;
  height: 3.75em;
  margin-top: 1em;
  padding: 1em;
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};
  color: #666666;

  :focus {
    font-size: 1em;
    border: ${(props) => (`1px solid${props.error ? '#FF424D' : props.theme.colors.primary}`)};
    outline: none;
    color: #666666;
  }
`;

const Error = styled.p`
  display: flex;
  align-items: center;
  height: 3.75em;
  color: #FF424D;
`;

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
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="아이디"
          value={loginFormStore.username}
          error={loginFormStore.errors.username || userStore.isLoginFailed}
          onChange={handleChangeUsername}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginFormStore.password}
          error={loginFormStore.errors.password || userStore.isLoginFailed}
          onChange={handleChangePassword}
        />
        <Error>
          {loginFormStore.errorMessage
            ? loginFormStore.errorMessage
            : null}
          {userStore.isLoginFailed
            ? '아이디 혹은 비밀번호가 맞지 않습니다'
            : null}
        </Error>
        <Button type="submit">
          로그인하기
        </Button>
      </Form>
      <StyledLink to="/signup">
        회원가입
      </StyledLink>
    </div>
  );
}
