import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';
import Button from './ui/Button';

export default function ProductDetail() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const productStore = useProductStore();
  const userStore = useUserStore();

  const { product } = productStore;

  const handleClickSendPresent = () => {
    if (!accessToken) {
      navigate('/login', { state: { previousPage: 'productDetailPage' } });

      return;
    }

    if (userStore.isAffordable(productStore.totalPrice())) {
      navigate('/order');
    }
  };

  if (!product) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <img
        src={product.imageUrl}
        alt={product.name}
        width={280}
        height={280}
      />
      <h1>{product.name}</h1>
      <strong>
        {numberFormat(product.price)}
        원
      </strong>
      <table>
        <tbody>
          <tr>
            <th>
              제조사
            </th>
            <td>
              {product.producer}
            </td>
          </tr>
          <tr>
            <th>
              구매수량
            </th>
            <td>
              <div>
                <button
                  type="button"
                  name="-"
                  disabled={productStore.count < 2}
                  onClick={() => productStore.countDown()}
                >
                  -
                </button>
                {productStore.count}
                <button
                  type="button"
                  name="+"
                  onClick={() => productStore.countUp()}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              상품설명
            </th>
            <td>
              {product.description}
            </td>
          </tr>
        </tbody>
      </table>
      <p>총 상품금액: </p>
      <strong>
        {numberFormat(productStore.totalPrice())}
        원
      </strong>
      <Button type="button" name="send-present" onClick={handleClickSendPresent}>
        선물하기
      </Button>
      {accessToken
      && !userStore.isAffordable(productStore.totalPrice())
      && (
        <p>
          ❌
          {' '}
          잔액이 부족하여 선물하기가 불가합니다
          {' '}
          ❌
        </p>
      )}
    </div>
  );
}
