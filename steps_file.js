/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  addItems(count) {
    this.amOnPage(`${backdoorBaseUrl}/add-items?count=${count}`);
  },

  submit() {
    this.click('[type=submit]');
  },

  login(username) {
    this.amOnPage('/login');

    this.fillField('username', username);
    this.fillField('password', 'Abcdef1!');
    this.click('로그인하기');

    this.waitForText('로그아웃');
  },
});
