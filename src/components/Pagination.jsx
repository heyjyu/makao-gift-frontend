import { Link, useNavigate } from 'react-router-dom';

export default function Pagination({ url, totalPages, currentPage = 1 }) {
  const navigate = useNavigate();

  const handleClickPrevious = () => {
    navigate(`${url}?page=${currentPage - 1}`);
  };

  const handleClickNext = () => {
    navigate(`${url}?page=${Number(currentPage) + 1}`);
  };

  if (totalPages === 0) {
    return null;
  }

  if (totalPages < 8) {
    return (
      <ul>
        <li>
          <button
            type="button"
            title="previous"
            name="previous"
            disabled={currentPage < 2}
            onClick={handleClickPrevious}
          >
            previous
          </button>
        </li>
        {
          [...Array(totalPages).keys()]
            .map((i) => (
              <li key={i}>
                <Link to={`${url}?page=${i + 1}`}>{i + 1}</Link>
              </li>
            ))
        }
        <li>
          <button
            type="button"
            title="next"
            name="next"
            disabled={currentPage > totalPages - 1}
            onClick={handleClickNext}
          >
            next
          </button>
        </li>
      </ul>
    );
  }

  if (currentPage < 5) {
    return (
      <ul>
        <li>
          <button
            type="button"
            title="previous"
            name="previous"
            disabled={currentPage < 2}
            onClick={handleClickPrevious}
          >
            previous
          </button>
        </li>
        <li>
          <Link to={`${url}?page=1`}>1</Link>
        </li>
        <li>
          <Link to={`${url}?page=2`}>2</Link>
        </li>
        <li>
          <Link to={`${url}?page=3`}>3</Link>
        </li>
        <li>
          <Link to={`${url}?page=4`}>4</Link>
        </li>
        <li>
          <Link to={`${url}?page=5`}>5</Link>
        </li>
        <li>
          <p>...</p>
        </li>
        <li>
          <Link to={`${url}?page=${totalPages}`}>{totalPages}</Link>
        </li>
        <li>
          <button
            type="button"
            title="next"
            name="next"
            disabled={currentPage > totalPages - 1}
            onClick={handleClickNext}
          >
            next
          </button>
        </li>
      </ul>
    );
  }

  if (currentPage > totalPages - 4) {
    return (
      <ul>
        <li>
          <button
            type="button"
            title="previous"
            name="previous"
            disabled={currentPage < 2}
            onClick={handleClickPrevious}
          >
            previous
          </button>
        </li>
        <li>
          <Link to={`${url}?page=1`}>1</Link>
        </li>
        <li>
          <p>...</p>
        </li>
        <li>
          <Link to={`${url}?page=${totalPages - 4}`}>{totalPages - 4}</Link>
        </li>
        <li>
          <Link to={`${url}?page=${totalPages - 3}`}>{totalPages - 3}</Link>
        </li>
        <li>
          <Link to={`${url}?page=${totalPages - 2}`}>{totalPages - 2}</Link>
        </li>
        <li>
          <Link to={`${url}?page=${totalPages - 1}`}>{totalPages - 1}</Link>
        </li>
        <li>
          <Link to={`${url}?page=${totalPages}`}>{totalPages}</Link>
        </li>
        <li>
          <button
            type="button"
            title="next"
            name="next"
            disabled={currentPage > totalPages - 1}
            onClick={handleClickNext}
          >
            next
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul>
      <li>
        <button
          type="button"
          title="previous"
          name="previous"
          disabled={currentPage < 2}
          onClick={handleClickPrevious}
        >
          previous
        </button>
      </li>
      <li>
        <Link to={`${url}?page=1`}>1</Link>
      </li>
      <li>
        <p>...</p>
      </li>
      <li>
        <Link to={`${url}?page=${currentPage - 1}`}>{currentPage - 1}</Link>
      </li>
      <li>
        <Link to={`${url}?page=${currentPage}`}>{currentPage}</Link>
      </li>
      <li>
        <Link to={`${url}?page=${Number(currentPage) + 1}`}>{Number(currentPage) + 1}</Link>
      </li>
      <li>
        <p>...</p>
      </li>
      <li>
        <Link to={`${url}?page=${totalPages}`}>{totalPages}</Link>
      </li>
      <li>
        <button
          type="button"
          title="next"
          name="next"
          disabled={currentPage > totalPages - 1}
          onClick={handleClickNext}
        >
          next
        </button>
      </li>
    </ul>
  );
}
