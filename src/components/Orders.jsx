import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';

export default function Orders() {
  const navigate = useNavigate();

  const orderStore = useOrderStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  if (!orderStore.orders.length) {
    return (
      <h1>내가 주문한 내역이 없습니다</h1>
    );
  }

  return (
    <div>
      <h1>
        내가 주문한 내역입니다
      </h1>
      <ul>
        {orderStore.orders.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>
              <img
                src={order.product.imageUrl}
                alt={order.product.name}
                width={280}
                height={280}
              />
              <p>{order.product.producer}</p>
              <p>{order.product.name}</p>
              <strong>
                To.
                {' '}
                {order.to}
              </strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
