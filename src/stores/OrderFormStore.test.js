import OrderFormStore from './OrderFormStore';

const context = describe;

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

  describe('validateName', () => {
    context('with correct name', () => {
      it('does not set nameErrorMessage', () => {
        orderFormStore.changeName('홍길동');

        orderFormStore.validateName();

        expect(orderFormStore.nameErrorMessage).toBeFalsy();
      });
    });

    context('with empty name', () => {
      it('sets nameErrorMessage', () => {
        orderFormStore.changeName('');

        orderFormStore.validateName();

        expect(orderFormStore.nameErrorMessage).toBeTruthy();
      });
    });

    context('with short name', () => {
      it('sets nameErrorMessage', () => {
        orderFormStore.changeName('길동');

        orderFormStore.validateName();

        expect(orderFormStore.nameErrorMessage).toBeTruthy();
      });
    });

    context('with long name', () => {
      it('sets nameErrorMessage', () => {
        orderFormStore.changeName('길동길동길동길동');

        orderFormStore.validateName();

        expect(orderFormStore.nameErrorMessage).toBeTruthy();
      });
    });

    context('with non-Korean name', () => {
      it('sets nameErrorMessage', () => {
        orderFormStore.changeName('Gildong');

        orderFormStore.validateName();

        expect(orderFormStore.nameErrorMessage).toBeTruthy();
      });
    });
  });

  describe('validateAddress', () => {
    context('with address', () => {
      it('does not set addressErrorMessage', () => {
        orderFormStore.changeAddress('서울시 행복구 행복동');

        orderFormStore.validateAddress();

        expect(orderFormStore.addressErrorMessage).toBeFalsy();
      });
    });

    context('with empty address', () => {
      it('sets addressErrorMessage', () => {
        orderFormStore.changeAddress('');

        orderFormStore.validateAddress();

        expect(orderFormStore.addressErrorMessage).toBeTruthy();
      });
    });
  });
});
