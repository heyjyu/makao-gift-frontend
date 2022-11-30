import { useNavigate } from 'react-router-dom';

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const handleClickSendPresent = () => {
    // TODO navigate to login page when not logged in
    navigate('/order');
  };

  return (
    <div>
      <img
        src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
        alt="갈비천왕"
        width={280}
        height={280}
      />
      <h1>갈비천왕+콜라1.25L</h1>
      <strong>10,000원</strong>
      <table>
        <tbody>
          <tr>
            <th>
              제조사
            </th>
            <td>
              제조사명
            </td>
          </tr>
          <tr>
            <th>
              구매수량
            </th>
            <td>
              <div>
                <button type="button">-</button>
                1
                <button type="button">+</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              상품설명
            </th>
            <td>
              이 상품은 이러이러합니다
            </td>
          </tr>
        </tbody>
      </table>
      <p>총 상품금액: </p>
      <strong>10,000원</strong>
      <button type="button" onClick={handleClickSendPresent}>
        선물하기
      </button>
    </div>
  );
}
