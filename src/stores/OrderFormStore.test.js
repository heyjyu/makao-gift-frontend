import OrderFormStore from './OrderFormStore';

describe('OrderFormStore', () => {
  let orderFormStore;

  beforeEach(() => {
    orderFormStore = new OrderFormStore();
  });

  describe('changeName', () => {
    it('changes name', () => {
      orderFormStore.changeName('홍길동');

      expect(orderFormStore.name).toBe('홍길동');
    });
  });

  describe('changeAddress', () => {
    it('changes address', () => {
      orderFormStore.changeAddress('서울시 행복구 행복동');

      expect(orderFormStore.address).toBe('서울시 행복구 행복동');
    });
  });

  describe('changeMessage', () => {
    it('changes message', () => {
      orderFormStore.changeMessage('행복하세요!');

      expect(orderFormStore.message).toBe('행복하세요!');
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      orderFormStore.changeName('홍길동');
      orderFormStore.changeAddress('서울시 행복구 행복동');
      orderFormStore.changeMessage('행복하세요!');

      orderFormStore.reset();

      expect(orderFormStore.name).toBe('');
      expect(orderFormStore.address).toBe('');
      expect(orderFormStore.message).toBe('');
    });
  });
});
