import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductDetail from '../components/ProductDetail';
import useProductStore from '../hooks/useProductStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ProductDetailPage() {
  const { id } = useParams();

  const productStore = useProductStore();

  useEffect(() => {
    productStore.reset();

    if (id) {
      productStore.fetchProduct(id);
    }
  }, [id]);

  return (
    <Container>
      <ProductDetail />
    </Container>
  );
}
