import { render, screen, waitFor } from '@testing-library/react';
import { apiService } from '../services/ApiService';
import { orderStore } from '../stores/OrderStore';
import OrderDetail from './OrderDetail';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('OrderDetail', () => {
  function renderOrderDetail() {
    render(<OrderDetail />);
  }

  context('with right access token', () => {
    beforeEach(() => {
      apiService.setAccessToken('ACCESS.TOKEN');
    });

    it('renders order detail', async () => {
      const id = 1;
      await orderStore.fetchOrder(id);

      renderOrderDetail();

      await waitFor(() => {
        expect(screen.queryByText('접근 권한이 없습니다')).toBeNull();
      });
    });
  });

  context('when logged out', () => {
    it('navigates to login page', async () => {
      const id = 1;
      await orderStore.fetchOrder(id);

      renderOrderDetail();

      expect(navigate).toBeCalledWith('/login');
    });
  });

  context('with wrong access token', () => {
    beforeEach(() => {
      apiService.setAccessToken('WRONG.TOKEN');
    });

    it('does not render order detail', async () => {
      const id = 1;
      await orderStore.fetchOrder(id);

      renderOrderDetail();

      expect(screen.queryByText('접근 권한이 없습니다')).not.toBeNull();
    });
  });
});
