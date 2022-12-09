import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderFormStore from '../hooks/useOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';
import Button from './ui/Button';
import Input from './ui/Input';

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 1024px;
  height: 100%;
  min-height: 60em;
  padding-block: 5em;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50em;
  margin-block: 2em;
  padding: 5em 8em;
  border: 1px solid #D9D9D9;
  border-radius: 0.5em;
`;

const Image = styled.img`
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const ProductInformation = styled.div`
  display: flex;
  gap: 2em;
  margin-bottom: 3em;

  div {
    display: grid;
    grid-template: auto 1fr auto auto / 1fr;
    gap: 1em;
  }

  p:first-child {
    color: #999999;
  }
`;

const ProductName = styled.p`
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 31.25em;
`;

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
        unitPrice: product.price,
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
    <Container>
      <Wrapper>
        <ProductInformation>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
          />
          <div>
            <p>{product.producer}</p>
            <ProductName>{product.name}</ProductName>
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
          </div>
        </ProductInformation>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="받는 분 성함"
            type="text"
            value={orderFormStore.name}
            required
            maxLength="7"
            handleChange={(e) => orderFormStore.changeName(e.target.value)}
            message="3~7자까지 한글만 사용 가능"
            errorMessage={orderFormStore.nameErrorMessage}
          />
          <Input
            name="address"
            label="받는 분 주소"
            type="text"
            value={orderFormStore.address}
            required
            handleChange={(e) => orderFormStore.changeAddress(e.target.value)}
            errorMessage={orderFormStore.addressErrorMessage}
          />
          <Input
            name="message"
            label="받는 분께 보내는 메시지"
            type="text"
            value={orderFormStore.message}
            maxLength="100"
            handleChange={(e) => orderFormStore.changeMessage(e.target.value)}
            message="100글자 이내로 입력해주세요"
          />
          <StyledButton type="submit">
            선물하기
          </StyledButton>
        </Form>
      </Wrapper>
    </Container>
  );
}
