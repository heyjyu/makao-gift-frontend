import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';
import dateFormat from '../utils/dateFormat';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 3em;
`;

const Background = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 4em;
  left: 0;
  width: 100vw;
  height: 18em;
  background: #FFF5BD;
  z-index: -1;
`;

const Image = styled.img`
  margin-bottom: 1em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const Producer = styled.p`
  font-size: 1.25em;
  color: #999999;
`;

const Name = styled.strong`
  font-size: 1.5em;
  font-weight: 700;
  width: 50em;
  height: 2.5em;
  margin-block: 0.5em;
  line-height: 1.25em;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Table = styled.table`
  width: 50em;
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
      width: 10em;
    }

    th:nth-child(2), td:nth-child(2) {
      width: calc(100% - 6em);
      text-align: right;
      color: #666666;
    }
  }
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 700;
  margin-top: 5em;
`;

export default function OrderDetail() {
  const navigate = useNavigate();

  const orderStore = useOrderStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  if (orderStore.isFetchOrderDetailFailed) {
    return (
      <Container>
        <Message>접근 권한이 없습니다</Message>
      </Container>
    );
  }

  if (!orderStore.order) {
    return (<p>Loading...</p>);
  }

  return (
    <Container>
      <Background />
      <Image
        src={orderStore.order.imageUrl}
        alt={orderStore.order.name}
        width={400}
        height={400}
      />
      <Producer>{orderStore.order.producer}</Producer>
      <Name>{orderStore.order.name}</Name>
      <Table>
        <tbody>
          <tr>
            <th>
              구매수량
            </th>
            <td>
              {orderStore.order.count}
            </td>
          </tr>
          <tr>
            <th>
              총 상품금액
            </th>
            <td>
              {numberFormat(orderStore.order.totalPrice)}
              원
            </td>
          </tr>
          <tr>
            <th>
              구매일
            </th>
            <td>
              {dateFormat(orderStore.order.createdAt)}
            </td>
          </tr>
          <tr>
            <th>
              받는 분
            </th>
            <td>
              {orderStore.order.to}
            </td>
          </tr>
          <tr>
            <th>
              받는 분 주소
            </th>
            <td>
              {orderStore.order.address}
            </td>
          </tr>
          <tr>
            <th>
              받는 분께 보내는 메시지
            </th>
            <td>
              {orderStore.order.message}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
