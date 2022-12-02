import { useNavigate } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

export default function ProductDetail() {
  const navigate = useNavigate();

  const productStore = useProductStore();

  const { product } = productStore;

  const handleClickSendPresent = () => {
    // TODO navigate to login page when not logged in
    // TODO show error message when amount is not enough
    navigate('/order');
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
      <button type="button" onClick={handleClickSendPresent}>
        선물하기
      </button>
    </div>
  );
}
