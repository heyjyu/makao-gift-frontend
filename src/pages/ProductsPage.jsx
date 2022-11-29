import { Link } from 'react-router-dom';

export default function ProductsPage() {
  return (
    <div>
      <div>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <h2>
          작정하고 준비한
          <strong>
            마카오톡 선물하기 아이템
          </strong>
        </h2>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </div>
      <h1>
        인기선물을 한 자리에 모았어요
      </h1>
      <ul>
        <li>
          <Link to="/products/1">
            <img
              src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
              alt="갈비천왕"
              width={280}
              height={280}
            />
            <p>제조사</p>
            <p>상품명</p>
            <strong>00,000원</strong>
          </Link>
        </li>
        <li>
          <Link to="/products/2">
            <img
              src="https://img1.kakaocdn.net/thumb/C320x320@2x.q82.fwebp/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220503173239_52adf00ef3c54f96931ddd31229920c7.jpg"
              alt="갈비천왕"
              width={280}
              height={280}
            />
            <p>제조사</p>
            <p>상품명</p>
            <strong>00,000원</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
}
