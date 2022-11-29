import { Link } from 'react-router-dom';

export default function OrdersPage() {
  return (
    <div>
      <h1>
        내가 주문한 내역입니다
      </h1>
      <ul>
        <li>
          <Link to="/orders/1">
            <img
              src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
              alt="갈비천왕"
              width={280}
              height={280}
            />
            <p>제조사</p>
            <p>상품명</p>
            <strong>To. 정에이미</strong>
          </Link>
        </li>
        <li>
          <Link to="/orders/2">
            <img
              src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
              alt="갈비천왕"
              width={280}
              height={280}
            />
            <p>제조사</p>
            <p>상품명</p>
            <strong>To. 정에이미</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
}
