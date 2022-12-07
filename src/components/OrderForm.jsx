import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useOrderFormStore from '../hooks/useOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';
import Button from './ui/Button';

export default function OrderForm() {
  const navigate = useNavigate();

  const productStore = useProductStore();
  const { product } = productStore;

  const orderFormStore = useOrderFormStore();

  const orderStore = useOrderStore();

  const userStore = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    orderFormStore.validate();

    if (orderFormStore.isValidateSuccessful) {
      await orderStore.orderItem({
        productId: product.id,
        count: productStore.count,
        to: orderFormStore.name,
        address: orderFormStore.address,
        message: orderFormStore.message,
      });
    }

    if (orderStore.isOrderSuccessful) {
      userStore.reduceAmount(productStore.totalPrice());
      navigate('/orders');
    }
  };

  const [accessToken] = useLocalStorage('accessToken', '');

  if (!accessToken) {
    return <p>로그인을 해주세요</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        src={product.imageUrl}
        alt={product.name}
        width={280}
        height={280}
      />
      <form onSubmit={handleSubmit}>
        <p>제조사</p>
        <p>상품명</p>
        <p>
          구매수량:
          {' '}
          {productStore.count}
        </p>
        <p>
          총 상품금액:
          {' '}
          {numberFormat(productStore.totalPrice())}
          원
        </p>
        <div>
          <label htmlFor="input-name">
            받는 분 성함
          </label>
          <input
            type="text"
            name="name"
            id="input-name"
            value={orderFormStore.name}
            maxLength={7}
            onChange={(e) => orderFormStore.changeName(e.target.value)}
          />
          {orderFormStore.nameErrorMessage
            ? <p>{orderFormStore.nameErrorMessage}</p>
            : <p>3~7자까지 한글만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-address">
            받는 분 주소
          </label>
          <input
            type="text"
            name="address"
            id="input-address"
            value={orderFormStore.address}
            onChange={(e) => orderFormStore.changeAddress(e.target.value)}
          />
          {orderFormStore.addressErrorMessage
            ? <p>{orderFormStore.addressErrorMessage}</p>
            : null}
        </div>
        <div>
          <label htmlFor="input-message">
            받는 분께 보내는 메시지
          </label>
          <input
            type="text"
            name="message"
            id="input-message"
            maxLength={100}
            value={orderFormStore.message}
            onChange={(e) => orderFormStore.changeMessage(e.target.value)}
          />
          <p>100글자 이내로 입력해주세요</p>
        </div>
        <Button type="submit">
          선물하기
        </Button>
      </form>
    </div>
  );
}
