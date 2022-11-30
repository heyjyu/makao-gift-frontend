import { useNavigate } from 'react-router-dom';

export default function OrderPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/orders');
  };

  return (
    <div>
      <img
        src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
        alt="갈비천왕"
        width={280}
        height={280}
      />
      <form onSubmit={handleSubmit}>
        <p>제조사</p>
        <p>상품명</p>
        <p>구매수량: 1</p>
        <p>총 상품금액: 10,000원</p>
        <div>
          <label htmlFor="input-name">
            받는 분 성함
          </label>
          <input type="text" name="name" id="input-name" />
          <p>3~7자까지 한글만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-address">
            받는 분 주소
          </label>
          <input type="text" name="address" id="input-address" />
        </div>
        <div>
          <label htmlFor="input-message">
            받는 분께 보내는 메시지
          </label>
          <input type="text" name="message" id="input-message" />
          <p>100글자 이내로 입력해주세요</p>
        </div>
        <button type="submit">
          선물하기
        </button>
      </form>
    </div>
  );
}
