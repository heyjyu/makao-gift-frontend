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
  background: url(/assets/images/left-arrow.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;

  :disabled {
    background: url(/assets/images/left-arrow-disabled.png) no-repeat 100% 100%;
    background-size: contain;
    cursor: default;
  }
`;

const NextButton = styled.button`
  width: 1em;
  height: 1em;
  border: none;
  background: url(/assets/images/right-arrow.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;

  :disabled {
    background: url(/assets/images/right-arrow-disabled.png) no-repeat 100% 100%;
    background-size: contain;
    cursor: default;
  }
`;

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
          [...Array(totalPages).keys()]
            .map((i) => (
              <li key={i}>
                <StyledLink to={`${url}?page=${i + 1}`} selected={Number(currentPage) === i + 1}>{i + 1}</StyledLink>
              </li>
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

  if (currentPage < 5) {
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
        <li>
          <StyledLink to={`${url}?page=1`} selected={Number(currentPage) === 1}>1</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=2`} selected={Number(currentPage) === 2}>2</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=3`} selected={Number(currentPage) === 3}>3</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=4`} selected={Number(currentPage) === 4}>4</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=5`} selected={Number(currentPage) === 5}>5</StyledLink>
        </li>
        <li>
          <p>...</p>
        </li>
        <li>
          <StyledLink to={`${url}?page=${totalPages}`}>{totalPages}</StyledLink>
        </li>
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

  if (currentPage > totalPages - 4) {
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
        <li>
          <StyledLink to={`${url}?page=1`}>1</StyledLink>
        </li>
        <li>
          <p>...</p>
        </li>
        <li>
          <StyledLink to={`${url}?page=${totalPages - 4}`} selected={Number(currentPage) === totalPages - 4}>{totalPages - 4}</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=${totalPages - 3}`} selected={Number(currentPage) === totalPages - 3}>{totalPages - 3}</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=${totalPages - 2}`} selected={Number(currentPage) === totalPages - 2}>{totalPages - 2}</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=${totalPages - 1}`} selected={Number(currentPage) === totalPages - 1}>{totalPages - 1}</StyledLink>
        </li>
        <li>
          <StyledLink to={`${url}?page=${totalPages}`} selected={Number(currentPage) === totalPages}>{totalPages}</StyledLink>
        </li>
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
      <li>
        <StyledLink to={`${url}?page=1`}>1</StyledLink>
      </li>
      <li>
        <p>...</p>
      </li>
      <li>
        <StyledLink to={`${url}?page=${currentPage - 1}`}>{currentPage - 1}</StyledLink>
      </li>
      <li>
        <StyledLink to={`${url}?page=${currentPage}`} selected>{currentPage}</StyledLink>
      </li>
      <li>
        <StyledLink to={`${url}?page=${Number(currentPage) + 1}`}>{Number(currentPage) + 1}</StyledLink>
      </li>
      <li>
        <p>...</p>
      </li>
      <li>
        <StyledLink to={`${url}?page=${totalPages}`}>{totalPages}</StyledLink>
      </li>
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
