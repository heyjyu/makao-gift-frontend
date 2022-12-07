import { apiService } from '../services/ApiService';
import OrderStore from './OrderStore';

const context = describe;

describe('OrderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  describe('changeOrderStatus', () => {
    context('when changed to successful', () => {
      it('changes orderStatus to successful', async () => {
        orderStore.changeOrderStatus('successful');

        expect(orderStore.isOrderSuccessful).toBeTruthy();
      });
    });
  });

  describe('orderItem', () => {
    context('when ordered successfully', () => {
      it('changes orderStatus to successful', async () => {
        const productId = 1;
        const count = 2;
        const to = '동길홍';
        const address = '서울시 행복구 행복동';
        const message = '행복하세요!';

        await orderStore.orderItem({
          productId, count, to, address, message,
        });

        expect(orderStore.isOrderSuccessful).toBeTruthy();
      });
    });
  });

  describe('fetchOrders', () => {
    it('modifies orders', async () => {
      await orderStore.fetchOrders({ page: 1, size: 8 });

      expect(orderStore.orders.length).toBe(2);
    });

    it('modifies totalPages', async () => {
      await orderStore.fetchOrders({ page: 1, size: 8 });

      expect(orderStore.totalPages).toBe(1);
    });
  });

  describe('fetchOrder', () => {
    context('with right accessToken', () => {
      it('modifies order', async () => {
        apiService.setAccessToken('ACCESS.TOKEN');
        await orderStore.fetchOrder(1);

        expect(orderStore.order).not.toBeNull();
        expect(orderStore.isFetchOrderDetailSuccessful).toBeTruthy();
      });
    });

    context('with wrong accessToken', () => {
      it('modifies order', async () => {
        apiService.setAccessToken('WRONG.TOKEN');
        await orderStore.fetchOrder(1);

        expect(orderStore.order).toBeNull();
        expect(orderStore.isFetchOrderDetailFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      orderStore.changeOrderStatus('successful');
      orderStore.reset();

      expect(orderStore.orders).toEqual([]);
      expect(orderStore.order).toBeNull();
      expect(orderStore.orderStatus).toBe('');
      expect(orderStore.fetchOrderDetailStatus).toBe('');
    });
  });
});
