import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';
import Pagination from './Pagination';

export default function Products() {
  const productStore = useProductStore();

  const { products } = productStore;

  const location = useLocation();

  const [searchParams] = useSearchParams();

  if (!products.length) {
    return (
      <p>상품이 존재하지 않습니다</p>
    );
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                width={280}
                height={280}
              />
              <p>{product.producer}</p>
              <p>{product.name}</p>
              <strong>
                {numberFormat(product.price)}
                원
              </strong>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        url={location.pathname}
        totalPages={productStore.totalPages}
        currentPage={searchParams.get('page') ?? 1}
      />
    </div>
  );
}
