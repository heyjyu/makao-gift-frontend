import { useEffect } from 'react';
import styled from 'styled-components';
import OrderForm from '../components/OrderForm';
import useOrderFormStore from '../hooks/useOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function OrderPage() {
  const orderFormStore = useOrderFormStore();
  const orderStore = useOrderStore();

  useEffect(() => {
    orderFormStore.reset();
    orderStore.reset();
  }, []);

  return (
    <Container>
      <OrderForm />
    </Container>
  );
}
