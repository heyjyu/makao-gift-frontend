import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Orders from '../components/Orders';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function OrdersPage() {
  const orderStore = useOrderStore();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    orderStore.fetchOrders({ page, size: 8 });
  }, [page]);

  return (
    <Container>
      <Orders />
    </Container>
  );
}
