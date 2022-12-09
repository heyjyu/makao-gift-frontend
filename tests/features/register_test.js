Feature('회원가입 - '
+ '고객은 회원 가입을 함으로써 선물을 보낼 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('회원 가입 성공', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.wait(1);

  I.click('로그인하기');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.click('로그인하기');

  I.see('내 잔액: 50,000원');
});

Scenario('존재하는 아이디를 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('username', 'myid');
  I.see('해당 아이디는 사용할 수 없습니다');
});

Scenario('이름을 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('이름을 입력해주세요');
});

Scenario('아이디를 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('비밀번호를 입력해주세요');
});

Scenario('비밀번호 확인을 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');

  I.submit();

  I.see('비밀번호를 입력해주세요');
});

Scenario('3글자 미만의 이름을 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('이름을 다시 확인해주세요');
});

Scenario('7글자 초과의 이름을 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '길동길동길동길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('이름을 다시 확인해주세요');
});

Scenario('영어를 포함한 이름을 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', 'Hong길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('이름을 다시 확인해주세요');
});

Scenario('4글자 미만의 아이디를 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'id1');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('아이디를 다시 확인해주세요');
});

Scenario('16글자 초과의 아이디를 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'idididididididid1');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('아이디를 다시 확인해주세요');
});

Scenario('특수문자를 포함한 아이디를 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'idid#');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');

  I.submit();

  I.see('아이디를 다시 확인해주세요');
});

Scenario('비밀번호에 대문자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'abcdef1!');
  I.fillField('password-check', 'abcdef1!');

  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호에 소문자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'ABCDEF1!');
  I.fillField('password-check', 'ABCDEF1!');

  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호에 숫자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdefg!');
  I.fillField('password-check', 'Abcdefg!');

  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호에 특수문자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdefg1');
  I.fillField('password-check', 'Abcdefg1');

  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호가 8글자 미만인 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcde1!');
  I.fillField('password-check', 'Abcde1!');

  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호가 비밀번호 확인과 일치하지 않는 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('name', '홍길동');
  I.fillField('username', 'gildong');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'ABcdef1!');

  I.submit();

  I.see('비밀번호가 일치하지 않습니다');
});

Scenario('로그인 페이지에서 회원 가입으로 이동하기', ({ I }) => {
  I.click('로그인');

  I.click({ css: 'main a' });

  I.see('SIGN UP');
});
