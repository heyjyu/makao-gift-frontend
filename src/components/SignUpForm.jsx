import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';
import Button from './ui/Button';
import Input from './ui/Input';
import Title from './ui/Title';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-size: 1em;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25em;
  height: 3.75em;
  margin-top: 2em;
  border: none;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  cursor: pointer;

  :hover {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: ${(props) => props.theme.colors.primary};
    color: #006148;
    cursor: pointer;
  }
  
  :active {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: #006148;
    color: white;
    cursor: pointer;
  }

  :disabled {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: #8D8D8D;
    color: white;
  }
`;

const Header = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const Message = styled.p`
  font-size: 1.25em;
  color: #444444;
`;

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
      <Container>
        <Header>회원가입 완료</Header>
        <Message>마카오 선물하기 회원가입이 완료되었습니다.</Message>
        <Message>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</Message>
        <StyledLink to="/login">
          로그인하기
        </StyledLink>
      </Container>
    );
  }

  return (
    <div>
      <Title>SIGN UP</Title>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="이름:"
          type="text"
          value={signUpFormStore.name}
          handleChange={(e) => signUpFormStore.changeName(e.target.value)}
          message="3~7자까지 한글만 사용 가능"
          errorMessage={signUpFormStore.nameErrorMessage}
        />
        <Input
          name="username"
          label="아이디:"
          type="text"
          value={signUpFormStore.username}
          handleChange={(e) => signUpFormStore.changeUsername(e.target.value)}
          message="영문소문자/숫자, 4~16자만 사용 가능"
          errorMessage={signUpFormStore.usernameErrorMessage}
        />
        <Input
          name="password"
          label="비밀번호:"
          type="password"
          value={signUpFormStore.password}
          handleChange={(e) => signUpFormStore.changePassword(e.target.value)}
          message="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함"
          errorMessage={signUpFormStore.passwordErrorMessage}
        />
        <Input
          name="password-check"
          label="비밀번호 확인:"
          type="password"
          value={signUpFormStore.passwordCheck}
          handleChange={(e) => signUpFormStore.changePasswordCheck(e.target.value)}
          errorMessage={signUpFormStore.passwordCheckErrorMessage}
        />
        <Button type="submit">
          회원가입
        </Button>
      </form>
    </div>
  );
}
