import LoginFormStore from './LoginFormStore';

describe('LoginFormStore', () => {
  let loginFormStore;

  beforeEach(() => {
    loginFormStore = new LoginFormStore();
  });

  describe('changeUsername', () => {
    it('changes username', () => {
      loginFormStore.changeUsername('myid');

      expect(loginFormStore.username).toBe('myid');
    });
  });

  describe('changePassword', () => {
    it('changes password', () => {
      loginFormStore.changePassword('password');

      expect(loginFormStore.password).toBe('password');
    });
  });
});
