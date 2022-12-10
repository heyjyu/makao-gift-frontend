import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  gap: 1.5em;
  justify-content: center;
  align-items: center;
  width: 100%;

  li {
    display: flex;
    align-items: center;
  }

  p {
    color: #9A9A9A;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 0.3em;
  color: ${(props) => (props.selected ? '#444444' : '#9A9A9A')};
`;

const PreviousButton = styled.button`
  width: 1em;
  height: 1em;
  border: none;
  background: url(/makao-gift-frontend/assets/images/left-arrow.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;

  :disabled {
    background: url(/makao-gift-frontend/assets/images/left-arrow-disabled.png) no-repeat 100% 100%;
    background-size: contain;
    cursor: default;
  }
`;

const NextButton = styled.button`
  width: 1em;
  height: 1em;
  border: none;
  background: url(/makao-gift-frontend/assets/images/right-arrow.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;

  :disabled {
    background: url(/makao-gift-frontend/assets/images/right-arrow-disabled.png) no-repeat 100% 100%;
    background-size: contain;
    cursor: default;
  }
`;

const rangeOf = ({ size, start = 0 }) => [...Array(size).keys()].map((i) => i + start);

const pageValues = ({ totalPages, currentPage }) => {
  if (totalPages < 8) {
    return [...rangeOf({ size: totalPages })];
  }

  if (currentPage < 5) {
    return [...rangeOf({ size: 5 }),
      { key: -1, value: '...' },
      totalPages - 1];
  }

  if (totalPages - currentPage < 4) {
    return [0,
      { key: -1, value: '...' },
      ...rangeOf({ size: 5, start: totalPages - 5 })];
  }

  return [0,
    { key: -1, value: '...' },
    ...rangeOf({ size: 3, start: currentPage - 2 }),
    { key: -2, value: '...' },
    totalPages - 1];
};

export default function Pagination({ url, totalPages, currentPage = 1 }) {
  const navigate = useNavigate();

  const handleClickPrevious = () => {
    navigate(`${url}?page=${currentPage - 1}`);
  };

  const handleClickNext = () => {
    navigate(`${url}?page=${Number(currentPage) + 1}`);
  };

  if (!totalPages) {
    return null;
  }

  const pages = pageValues({
    totalPages: Number(totalPages),
    currentPage: Number(currentPage),
  });

  return (
    <List>
      <li>
        <PreviousButton
          type="button"
          title="previous"
          name="previous"
          disabled={currentPage < 2}
          onClick={handleClickPrevious}
        >
          previous
        </PreviousButton>
      </li>
      {
        pages
          .map((page) => (
            typeof page === 'number'
              ? (
                <li key={page}>
                  <StyledLink
                    to={`${url}?page=${page + 1}`}
                    selected={Number(currentPage) === page + 1}
                  >
                    {page + 1}

                  </StyledLink>
                </li>
              ) : (
                <li key={page.key}>
                  <p>
                    {page.value}
                  </p>
                </li>
              )
          ))
      }
      <li>
        <NextButton
          type="button"
          title="next"
          name="next"
          disabled={currentPage > totalPages - 1}
          onClick={handleClickNext}
        >
          next
        </NextButton>
      </li>
    </List>
  );
}
