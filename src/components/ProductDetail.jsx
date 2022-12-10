import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';
import Button from './ui/Button';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2em;
  min-width: 1024px;
  height: 100%;
  min-height: 50em;
  padding-block: 5em;
`;

const Wrapper = styled.div`
  width: 31.25em;
`;

const Title = styled.h1`
  font-size: 1.875em;
  font-weight: 500;
  width: 100%;
  margin-bottom: 0.75em;
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Image = styled.img`
  margin-bottom: 1em;
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const Price = styled.strong`
  font-size: 2.5em;
  font-weight: 700;
  margin-block: 0.75em;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2em;
  border-block: 1px solid #D8D8D8;
  
  th, td {
    text-align: left;
    vertical-align: middle;
  }

  th {
    font-weight: 500;
    color: #666666;
  }

  td {
    font-weight: 1.25em;
    color: #444444;
  }

  tr {
    border-block: 1px solid #D8D8D8;
    height: 5em;

    th:first-child, td:first-child {
      width: 6em;
    }

    th:nth-child(2), td:nth-child(2) {
      width: calc(100% - 6em);
    }
  }
`;

const Count = styled.div`
  font-size: 1.25em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 6em;
  height: 2em;
  border: 1px solid #D9D9D9;
  border-radius: 0.5em;
  color: #666666;
`;

const ReduceButton = styled.button`
  width: 2em;
  height: 2em;
  margin-left: 0.5em;
  border: none;
  background: url(/makao-gift-frontend/assets/images/minus-black.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;

  :disabled {
    background: url(/makao-gift-frontend/assets/images/minus-gray.png) no-repeat 100% 100%;
    background-size: contain;
    cursor: default;
  }
`;

const AddButton = styled.button`
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  border: none;
  background: url(/makao-gift-frontend/assets/images/plus-black.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1em;
`;

const Message = styled.p`
  font-weight: 500;
  display: inline;
`;

const Error = styled.p`
  font-weight: 700;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  color: #FF424D;
`;

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
    <Container>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={600}
        height={600}
      />
      <Wrapper>
        <Title>{product.name}</Title>
        <Price>
          {numberFormat(product.price)}
          원
        </Price>
        <Table>
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
                <Count>
                  <ReduceButton
                    type="button"
                    name="-"
                    disabled={productStore.count < 2}
                    onClick={() => productStore.countDown()}
                  >
                    -
                  </ReduceButton>
                  {productStore.count}
                  <AddButton
                    type="button"
                    name="+"
                    onClick={() => productStore.countUp()}
                  >
                    +
                  </AddButton>
                </Count>
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
        </Table>
        <TotalPrice>
          <Message>총 상품금액: </Message>
          <Price>
            {numberFormat(productStore.totalPrice())}
            원
          </Price>
        </TotalPrice>
        <Button
          type="button"
          name="send-present"
          onClick={handleClickSendPresent}
          disabled={accessToken && !userStore.isAffordable(productStore.totalPrice())}
        >
          선물하기
        </Button>
        {accessToken
      && !userStore.isAffordable(productStore.totalPrice())
      && (
        <Error>
          ❌
          {' '}
          잔액이 부족하여 선물하기가 불가합니다
          {' '}
          ❌
        </Error>
      )}
      </Wrapper>
    </Container>
  );
}
