import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('fetchProducts', () => {
    it('loads products', async () => {
      await productStore.fetchProducts();

      expect(productStore.products).toHaveLength(2);
    });
  });

  describe('fetchProduct', () => {
    it('loads product', async () => {
      const id = 1;

      await productStore.fetchProduct(id);

      expect(productStore.product.name).toBe('갈비천왕+콜라1.25L');
    });
  });

  describe('countUp', () => {
    it('increases count by 1', async () => {
      const initialCount = productStore.count;

      productStore.countUp();

      expect(productStore.count - initialCount).toBe(1);
    });
  });

  describe('countDown', () => {
    context('when count is more then 1', () => {
      it('decreases count by 1', async () => {
        productStore.countUp();
        const initialCount = productStore.count;

        productStore.countDown();

        expect(initialCount - productStore.count).toBe(1);
      });
    });

    context('when count is 1', () => {
      it('does not decrease amount', async () => {
        productStore.reset();

        productStore.countDown();

        expect(productStore.count).toBe(1);
      });
    });
  });

  describe('setCount', () => {
    it('sets count', () => {
      productStore.setCount(5);

      expect(productStore.count).toBe(5);
    });
  });

  describe('reset', () => {
    it('sets count to 1', async () => {
      productStore.countUp();

      productStore.reset();

      expect(productStore.count).toBe(1);
    });

    it('sets product to null', async () => {
      const id = 1;

      await productStore.fetchProduct(id);

      productStore.reset();

      expect(productStore.product).toBeNull();
    });
  });

  describe('totalPrice', () => {
    it('computes total amount of the order', async () => {
      const id = 1;

      await productStore.fetchProduct(id);

      expect(productStore.totalPrice()).toBe(10000);

      productStore.countUp();

      expect(productStore.totalPrice()).toBe(20000);
    });
  });
});
