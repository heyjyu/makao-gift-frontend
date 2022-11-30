import { useEffect } from 'react';
import Products from '../components/Products';
import useProductStore from '../hooks/useProductStore';

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

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
      <Products />
    </div>
  );
}
