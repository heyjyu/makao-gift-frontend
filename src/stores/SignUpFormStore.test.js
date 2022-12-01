import SignUpFormStore from './SignUpFormStore';

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
});
