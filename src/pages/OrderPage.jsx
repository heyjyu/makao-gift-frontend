import { useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import useOrderFormStore from '../hooks/useOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';

export default function OrderPage() {
  const orderFormStore = useOrderFormStore();
  const orderStore = useOrderStore();

  useEffect(() => {
    orderFormStore.reset();
    orderStore.reset();
  }, []);

  return (
    <OrderForm />
  );
}
