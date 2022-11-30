export default function OrderDetailPage() {
  return (
    <div>
      <img
        src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
        alt="갈비천왕"
        width={280}
        height={280}
      />
      <p>제조사</p>
      <p>상품명</p>
      <table>
        <tbody>
          <tr>
            <th>
              구매수량
            </th>
            <td>
              1
            </td>
          </tr>
          <tr>
            <th>
              총 상품금액
            </th>
            <td>
              10,000원
            </td>
          </tr>
          <tr>
            <th>
              구매일
            </th>
            <td>
              2022-10-01
            </td>
          </tr>
          <tr>
            <th>
              받는 분
            </th>
            <td>
              정에이미
            </td>
          </tr>
          <tr>
            <th>
              받는 분 주소
            </th>
            <td>
              주소
            </td>
          </tr>
          <tr>
            <th>
              받는 분께 보내는 메시지
            </th>
            <td>
              보내는 메시지
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
