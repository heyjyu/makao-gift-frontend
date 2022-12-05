import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetail from '../components/OrderDetail';
import { orderStore } from '../stores/OrderStore';

export default function OrderDetailPage() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      orderStore.fetchOrder(id);
    }
  }, []);

  return (
    <OrderDetail />
  );
}
