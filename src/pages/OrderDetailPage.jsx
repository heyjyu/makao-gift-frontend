import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import OrderDetail from '../components/OrderDetail';
import { orderStore } from '../stores/OrderStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function OrderDetailPage() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      orderStore.fetchOrder(id);
    }
  }, []);

  return (
    <Container>
      <OrderDetail />
    </Container>
  );
}
