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
        const username = 'myId';
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
        const username = 'existingId';
        const password = 'Abcdef1!';
        const passwordCheck = 'Abcdef1!';

        await userStore.signUp({
          name, username, password, passwordCheck,
        });

        expect(userStore.isSignUpFailed).toBeTruthy();
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
});
