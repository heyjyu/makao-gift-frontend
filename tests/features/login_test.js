Feature('로그인 - 고객은 로그인을 함으로써 선물을 보내고, 보냈던 이력을 확인할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('로그인', ({ I }) => {
  I.click('로그인');

  I.fillField('username', 'myid');
  I.fillField('password', 'Abcdef1!');

  I.click('로그인하기');

  I.see('잔액: 50,000원');
  I.see('로그아웃');
  I.dontSee('회원가입');
  I.dontSee('로그인');
});

Scenario('아이디를 입력하지 않은 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('password', 'Abcdef1!');

  I.click('로그인하기');

  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않은 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('username', 'myid');

  I.click('로그인하기');

  I.see('비밀번호를 입력해주세요');
});

Scenario('존재하지 않는 아이디를 입력한 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('username', '0000');
  I.fillField('password', 'Abcdef1!');

  I.click('로그인하기');

  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});

Scenario('비밀번호가 틀린 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('username', 'myid');
  I.fillField('password', 'ABcdef1!');

  I.click('로그인하기');

  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});
