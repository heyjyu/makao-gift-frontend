import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('signUp', () => {
    context('when signed up successfully', () => {
      it('changes signUpStatus to successful', async () => {
        const name = '홍길동';
        const username = 'myid';
        const password = 'Abcdef1!';
        const passwordCheck = 'Abcdef1!';

        await userStore.signUp({
          name, username, password, passwordCheck,
        });

        expect(userStore.isSignUpSuccessful).toBeTruthy();
      });
    });

    context('when failed to sign up', () => {
      it('changes signUpStatus to failed', async () => {
        const name = '홍길동';
        const username = 'existingid';
        const password = 'Abcdef1!';
        const passwordCheck = 'Abcdef1!';

        await userStore.signUp({
          name, username, password, passwordCheck,
        });

        expect(userStore.isSignUpFailed).toBeTruthy();
      });
    });
  });

  describe('login', () => {
    context('when logged in successfully', () => {
      it('changes loginStatus to successful', async () => {
        const username = 'myid';
        const password = 'Abcdef1!';

        await userStore.login({ username, password });

        expect(userStore.isLoginSuccessful).toBeTruthy();
      });

      it('changes amount', async () => {
        const username = 'myid';
        const password = 'Abcdef1!';
        const amount = 50000;

        await userStore.login({ username, password });

        expect(userStore.amount).toBe(amount);
      });
    });

    context('when failed to login', () => {
      it('changes loginStatus to failed', async () => {
        const username = 'wrongid';
        const password = 'Abcdef1!';

        await userStore.login({ username, password });

        expect(userStore.isLoginFailed).toBeTruthy();
      });
    });
  });

  describe('resetSignUpStatus', () => {
    it('resets signUpStatus', () => {
      userStore.changeSignUpStatus('processing');

      expect(userStore.signUpStatus).toBe('processing');

      userStore.resetSignUpStatus();

      expect(userStore.signUpStatus).toBe('');
    });
  });

  describe('resetLoginStatus', () => {
    it('resets loginStatus', () => {
      userStore.changeLoginStatus('processing');

      expect(userStore.loginStatus).toBe('processing');

      userStore.resetLoginStatus();

      expect(userStore.loginStatus).toBe('');
    });
  });

  describe('isAffordable', () => {
    it('checks if user amount is more than total price', () => {
      expect(userStore.isAffordable(userStore.amount - 100)).toBeTruthy();
      expect(userStore.isAffordable(userStore.amount)).toBeTruthy();
      expect(userStore.isAffordable(userStore.amount + 100)).toBeFalsy();
    });
  });

  describe('setAmount', () => {
    it('modifies amount', () => {
      userStore.setAmount(5000000);

      expect(userStore.amount).toBe(5000000);
    });
  });
});
