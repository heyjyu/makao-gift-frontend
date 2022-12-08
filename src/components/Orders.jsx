import { useEffect } from 'react';
import {
  Link, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';
import Pagination from './Pagination';

const Container = styled.div`
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

const To = styled.strong`
  font-weight: 700;
  color: #444444;
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 700;
  margin-top: 5em;
  text-align: center;
`;

export default function Orders() {
  const navigate = useNavigate();

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const orderStore = useOrderStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  if (!orderStore.orders.length) {
    return (
      <Container>
        <Message>내가 주문한 내역이 없습니다</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        내가 주문한 내역입니다
      </Title>
      <List>
        {orderStore.orders.map((order) => (
          <Item key={order.id}>
            <Link to={`/orders/${order.id}`}>
              <Image
                src={order.product.imageUrl}
                alt={order.product.name}
                width={280}
                height={280}
              />
              <Producer>{order.product.producer}</Producer>
              <Name>{order.product.name}</Name>
              <To>
                To.
                {' '}
                {order.to}
              </To>
            </Link>
          </Item>
        ))}
      </List>
      <Pagination
        url={location.pathname}
        totalPages={orderStore.totalPages}
        currentPage={searchParams.get('page') ?? 1}
      />
    </Container>
  );
}
