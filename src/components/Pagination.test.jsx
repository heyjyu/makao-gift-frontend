import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';

const context = describe;

describe('Pagination', () => {
  const renderPagination = ({ totalPages, currentPage }) => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Pagination
          url="/products"
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </MemoryRouter>,
    );
  };

  context('when total pages is 0', () => {
    it('return null', () => {
      renderPagination({ totalPages: 0, currentPage: 0 });

      expect(screen.queryByText('0')).toBeNull();
      expect(screen.queryByText('1')).toBeNull();
      expect(screen.queryByTitle('previous')).toBeNull();
      expect(screen.queryByTitle('next')).toBeNull();
    });
  });

  context('when total pages is 1', () => {
    it('return page 1 and previous and next button', () => {
      renderPagination({ totalPages: 1, currentPage: 1 });

      expect(screen.queryByText('1')).not.toBeNull();
      expect(screen.queryByTitle('previous')).not.toBeNull();
      expect(screen.queryByTitle('next')).not.toBeNull();
    });
  });

  context('when total pages is 10', () => {
    context('when current page is 4', () => {
      it('return page 1, 2, 3, 4, 5, 10 and previous and next button', () => {
        renderPagination({ totalPages: 10, currentPage: 4 });

        expect(screen.queryByText('1')).not.toBeNull();
        expect(screen.queryByText('2')).not.toBeNull();
        expect(screen.queryByText('3')).not.toBeNull();
        expect(screen.queryByText('4')).not.toBeNull();
        expect(screen.queryByText('5')).not.toBeNull();
        expect(screen.queryByText('10')).not.toBeNull();
        expect(screen.queryByTitle('previous')).not.toBeNull();
        expect(screen.queryByTitle('next')).not.toBeNull();
      });
    });

    context('when current page is 5', () => {
      it('return page 1, 4, 5, 6, 10 and previous and next button', () => {
        renderPagination({ totalPages: 10, currentPage: 5 });

        expect(screen.queryByText('1')).not.toBeNull();
        expect(screen.queryByText('4')).not.toBeNull();
        expect(screen.queryByText('5')).not.toBeNull();
        expect(screen.queryByText('6')).not.toBeNull();
        expect(screen.queryByText('10')).not.toBeNull();
        expect(screen.queryByTitle('previous')).not.toBeNull();
        expect(screen.queryByTitle('next')).not.toBeNull();
      });
    });

    context('when current page is 6', () => {
      it('return page 1, 5, 6, 7, 10 and previous and next button', () => {
        renderPagination({ totalPages: 10, currentPage: 6 });

        expect(screen.queryByText('1')).not.toBeNull();
        expect(screen.queryByText('5')).not.toBeNull();
        expect(screen.queryByText('6')).not.toBeNull();
        expect(screen.queryByText('7')).not.toBeNull();
        expect(screen.queryByText('10')).not.toBeNull();
        expect(screen.queryByTitle('previous')).not.toBeNull();
        expect(screen.queryByTitle('next')).not.toBeNull();
      });
    });

    context('when current page is 7', () => {
      it('return page 1, 6, 7, 8, 9, 10 and previous and next button', () => {
        renderPagination({ totalPages: 10, currentPage: 7 });

        expect(screen.queryByText('1')).not.toBeNull();
        expect(screen.queryByText('6')).not.toBeNull();
        expect(screen.queryByText('7')).not.toBeNull();
        expect(screen.queryByText('8')).not.toBeNull();
        expect(screen.queryByText('9')).not.toBeNull();
        expect(screen.queryByText('10')).not.toBeNull();
        expect(screen.queryByTitle('previous')).not.toBeNull();
        expect(screen.queryByTitle('next')).not.toBeNull();
      });
    });
  });
});
