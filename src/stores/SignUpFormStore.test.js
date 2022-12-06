import SignUpFormStore from './SignUpFormStore';

const context = describe;

describe('SignUpFormStore', () => {
  let signUpFormStore;

  beforeEach(() => {
    signUpFormStore = new SignUpFormStore();
  });

  describe('changeName', () => {
    it('changes name', () => {
      signUpFormStore.changeName('홍길동');

      expect(signUpFormStore.name).toBe('홍길동');
    });
  });

  describe('changeUsername', () => {
    it('changes username', () => {
      signUpFormStore.changeUsername('myid');

      expect(signUpFormStore.username).toBe('myid');
    });
  });

  describe('changePassword', () => {
    it('changes password', () => {
      signUpFormStore.changePassword('password');

      expect(signUpFormStore.password).toBe('password');
    });
  });

  describe('changePasswordCheck', () => {
    it('changes passwordCheck', () => {
      signUpFormStore.changePasswordCheck('passwordCheck');

      expect(signUpFormStore.passwordCheck).toBe('passwordCheck');
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      signUpFormStore.changePasswordCheck('passwordCheck');
      signUpFormStore.reset();

      expect(signUpFormStore.passwordCheck).toBe('');
    });
  });

  describe('validateName', () => {
    context('with valid name', () => {
      it('does not set nameErrorMessage', () => {
        signUpFormStore.changeName('홍길동');

        signUpFormStore.validateName();

        expect(signUpFormStore.nameErrorMessage).toBeFalsy();
      });
    });

    context('with empty name', () => {
      it('sets nameErrorMessage', () => {
        signUpFormStore.changeName('');

        signUpFormStore.validateName();

        expect(signUpFormStore.nameErrorMessage).toBeTruthy();
      });
    });

    context('with short name', () => {
      it('sets nameErrorMessage', () => {
        signUpFormStore.changeName('길동');

        signUpFormStore.validateName();

        expect(signUpFormStore.nameErrorMessage).toBeTruthy();
      });
    });

    context('with long name', () => {
      it('sets nameErrorMessage', () => {
        signUpFormStore.changeName('길동길동길동길동');

        signUpFormStore.validateName();

        expect(signUpFormStore.nameErrorMessage).toBeTruthy();
      });
    });

    context('with non-Korean name', () => {
      it('sets nameErrorMessage', () => {
        signUpFormStore.changeName('Gildong');

        signUpFormStore.validateName();

        expect(signUpFormStore.nameErrorMessage).toBeTruthy();
      });
    });
  });

  describe('validateUsername', () => {
    context('with valid username', () => {
      it('does not set usernameErrorMessage', () => {
        signUpFormStore.changeUsername('newid1');

        signUpFormStore.validateUsername();

        expect(signUpFormStore.usernameErrorMessage).toBeFalsy();
      });
    });

    context('with empty username', () => {
      it('sets usernameErrorMessage', () => {
        signUpFormStore.changeUsername('');

        signUpFormStore.validateUsername();

        expect(signUpFormStore.usernameErrorMessage).toBeTruthy();
      });
    });

    context('with short username', () => {
      it('sets usernameErrorMessage', () => {
        signUpFormStore.changeUsername('new');

        signUpFormStore.validateUsername();

        expect(signUpFormStore.usernameErrorMessage).toBeTruthy();
      });
    });

    context('with long username', () => {
      it('sets usernameErrorMessage', () => {
        signUpFormStore.changeUsername('newidnewidnewid11');

        signUpFormStore.validateUsername();

        expect(signUpFormStore.usernameErrorMessage).toBeTruthy();
      });
    });

    context('with username with special character', () => {
      it('sets usernameErrorMessage', () => {
        signUpFormStore.changeUsername('newid!');

        signUpFormStore.validateUsername();

        expect(signUpFormStore.usernameErrorMessage).toBeTruthy();
      });
    });

    context('with existing username', () => {
      it('sets usernameErrorMessage', async () => {
        signUpFormStore.changeUsername('existid');

        await signUpFormStore.validateUsername();

        expect(signUpFormStore.usernameErrorMessage).toBeTruthy();
      });
    });
  });

  describe('validatePassword', () => {
    context('with valid password', () => {
      it('does not set passwordErrorMessage', () => {
        signUpFormStore.changePassword('Abcdef1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeFalsy();
      });
    });

    context('with empty password', () => {
      it('sets passwordErrorMessage', () => {
        signUpFormStore.changePassword('');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeTruthy();
      });
    });

    context('with short password', () => {
      it('sets passwordErrorMessage', () => {
        signUpFormStore.changePassword('Abcde1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeTruthy();
      });
    });

    context('with password without lower case', () => {
      it('sets passwordErrorMessage', () => {
        signUpFormStore.changePassword('ABCDEF1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeTruthy();
      });
    });

    context('with password without upper case', () => {
      it('sets passwordErrorMessage', () => {
        signUpFormStore.changePassword('abcdef1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeTruthy();
      });
    });

    context('with password without number', () => {
      it('sets passwordErrorMessage', () => {
        signUpFormStore.changePassword('Abcdefg!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeTruthy();
      });
    });

    context('with password without special character', () => {
      it('sets passwordErrorMessage', () => {
        signUpFormStore.changePassword('Abcdefg1');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.passwordErrorMessage).toBeTruthy();
      });
    });
  });

  describe('validatePasswordCheck', () => {
    context('with passwordCheck same as password', () => {
      it('does not set passwordCheckErrorMessage', () => {
        signUpFormStore.changePassword('Abcdef1!');
        signUpFormStore.changePasswordCheck('Abcdef1!');

        signUpFormStore.validatePasswordCheck();

        expect(signUpFormStore.passwordCheckErrorMessage).toBeFalsy();
      });
    });

    context('with empty passwordCheck', () => {
      it('sets passwordCheckErrorMessage', () => {
        signUpFormStore.changePasswordCheck('');

        signUpFormStore.validatePasswordCheck();

        expect(signUpFormStore.passwordCheckErrorMessage).toBeTruthy();
      });
    });

    context('with passwordCheck different from password', () => {
      it('sets addressErrorMessage', () => {
        signUpFormStore.changePassword('Abcdef1!');
        signUpFormStore.changePasswordCheck('ABcdef1!');

        signUpFormStore.validatePasswordCheck();

        expect(signUpFormStore.passwordCheckErrorMessage).toBeTruthy();
      });
    });
  });
});
