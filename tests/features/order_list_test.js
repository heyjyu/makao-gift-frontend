Feature('주문 목록 확인 - '
+ '고객은 자신이 주문한 상품의 목록을 확인함으로써 중복되지 않는 선물을 보낼 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.addItems(1);

  I.amOnPage('/');
  I.login('myId');
});

Scenario('주문 목록이 없는 경우', ({ I }) => {
  I.click('주문조회');

  I.see('내가 주문한 내역이 없습니다');
});

Scenario('주문 목록이 있는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.see('To. 동길홍');
});

Scenario('로그인하지 않은 경우', ({ I }) => {
  I.click('로그아웃');

  I.click('주문조회');

  I.see('로그인하기');
});
