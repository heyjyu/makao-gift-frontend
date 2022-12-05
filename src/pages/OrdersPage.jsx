import { useEffect } from 'react';
import Orders from '../components/Orders';
import useOrderStore from '../hooks/useOrderStore';

export default function OrdersPage() {
  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.fetchOrders();
  }, []);

  return (
    <Orders />
  );
}
