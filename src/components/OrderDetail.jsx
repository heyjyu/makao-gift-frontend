import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';
import dateFormat from '../utils/dateFormat';
import numberFormat from '../utils/numberFormat';

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
    return (<p>접근 권한이 없습니다</p>);
  }

  if (!orderStore.order) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <img
        src={orderStore.order.imageUrl}
        alt={orderStore.order.name}
        width={280}
        height={280}
      />
      <p>{orderStore.order.producer}</p>
      <strong>{orderStore.order.name}</strong>
      <table>
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
      </table>
    </div>
  );
}
