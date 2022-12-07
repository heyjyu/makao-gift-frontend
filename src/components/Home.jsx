import styled from 'styled-components';

const Container = styled.div`
  font-weight: 700;
  display: flex;
  width: 1024px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Message = styled.p`
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.secondaryText};
`;

const Title = styled.h1`
  font-size: 2.25em;
  margin-block: 0.65em;
  
  strong {
    display: block;
  }
`;

export default function Home() {
  return (
    <Container>
      <Wrapper>
        <Message>무엇을 선물할지 고민이라면</Message>
        <Title>
          <strong>특별한</strong>
          아이템을 전하세요
        </Title>
        <p>마카오 선물하기에서만 볼 수 있는 특별한 아이템</p>
      </Wrapper>
      <Wrapper>
        <img
          src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220511102314_8430efd8b1684535a403a36a4c168ee8.jpg"
          alt="present"
          width={490}
          height={490}
        />
      </Wrapper>
    </Container>
  );
}
