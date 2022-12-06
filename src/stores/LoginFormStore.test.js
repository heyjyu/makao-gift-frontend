import LoginFormStore from './LoginFormStore';

const context = describe;

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

  describe('reset', () => {
    it('resets fields', () => {
      loginFormStore.changePassword('password');
      loginFormStore.reset();

      expect(loginFormStore.password).toBe('');
    });
  });

  describe('validate', () => {
    context('with username', () => {
      it('does not set username error', () => {
        loginFormStore.changeUsername('myid');

        loginFormStore.validate();

        expect(loginFormStore.errors.username).toBeFalsy();
      });
    });

    context('with password', () => {
      it('does not set password error', () => {
        loginFormStore.changePassword('password');

        loginFormStore.validate();

        expect(loginFormStore.errors.password).toBeFalsy();
      });
    });

    context('with empty username', () => {
      it('sets username error', () => {
        loginFormStore.changeUsername('');
        loginFormStore.changePassword('password');

        loginFormStore.validate();

        expect(loginFormStore.errors.username).toBeTruthy();
        expect(loginFormStore.isValidateSuccessful).toBeFalsy();
      });

      it('sets error message', () => {
        loginFormStore.changeUsername('');
        loginFormStore.changePassword('password');

        loginFormStore.validate();

        expect(loginFormStore.errorMessage).toBeTruthy();
      });
    });

    context('with empty password', () => {
      it('sets password error', () => {
        loginFormStore.changeUsername('myid');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errors.password).toBeTruthy();
        expect(loginFormStore.isValidateSuccessful).toBeFalsy();
      });

      it('sets error message', () => {
        loginFormStore.changeUsername('myid');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errorMessage).toBeTruthy();
      });
    });

    context('with empty username and password', () => {
      it('sets username error', () => {
        loginFormStore.changeUsername('');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errors.username).toBeTruthy();
        expect(loginFormStore.isValidateSuccessful).toBeFalsy();
      });

      it('sets password error', () => {
        loginFormStore.changeUsername('');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errors.password).toBeTruthy();
      });

      it('sets error message', () => {
        loginFormStore.changeUsername('');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errorMessage).toBeTruthy();
      });
    });
  });
});
