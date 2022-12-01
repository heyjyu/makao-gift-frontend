Feature('로그아웃 - 고객은 로그아웃을 함으로써 다른 사람이 자신의 계정을 사용하는 것을 막을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('로그아웃', ({ I }) => {
  I.login('myid');

  I.see('잔액: 50,000원');

  I.click('로그아웃');

  I.dontSee('잔액: 50,000원');
  I.see('로그인');
});
