import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';
import Pagination from './Pagination';

const Container = styled.div`
  position: relative;
  top: 18em;
  padding-block: 3em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 1em;
`;

const Image = styled.img`
  margin-bottom: 1em;
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const List = styled.ul`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  gap: 2em;
  margin-bottom: 3em;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
`;

const Producer = styled.p`
  color: #999999;
`;

const Name = styled.p`
  width: 17.5em;
  height: 2.5em;
  margin-block: 0.5em;
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.strong`
  font-size: 1.25em;
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 700;
  margin-top: 5em;
  text-align: center;
`;

export default function Products() {
  const productStore = useProductStore();

  const { products } = productStore;

  const location = useLocation();

  const [searchParams] = useSearchParams();

  if (!products.length) {
    return (
      <Container>
        <Message>상품이 존재하지 않습니다</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        인기선물을 한 자리에 모았어요
      </Title>
      <List>
        {products.map((product) => (
          <Item key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={280}
                height={280}
              />
              <Producer>{product.producer}</Producer>
              <Name>{product.name}</Name>
              <p>
                <Price>
                  {numberFormat(product.price)}
                </Price>
                원
              </p>
            </Link>
          </Item>
        ))}
      </List>
      <Pagination
        url={location.pathname}
        totalPages={productStore.totalPages}
        currentPage={searchParams.get('page') ?? 1}
      />
    </Container>
  );
}
