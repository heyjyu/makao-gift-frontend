import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/Banner';
import Products from '../components/Products';
import useProductStore from '../hooks/useProductStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ProductsPage() {
  const productStore = useProductStore();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    productStore.fetchProducts({ page, size: 8 });
  }, [page]);

  return (
    <Container>
      <Banner />
      <Products />
    </Container>
  );
}
