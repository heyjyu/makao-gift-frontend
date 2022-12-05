function today() {
  const date = new Date();

  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
}

Feature('주문 세부 정보 확인 - '
+ '고객은 주문 세부 정보를 확인함으로써 새로 선물을 보낼 때 주소, 메시지 정보를 활용할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.addItems(1);

  I.amOnPage('/');
  I.login('myid');
});

Scenario('나의 주문 세부 정보 확인하는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('send-present');

  I.fillField('name', '동길홍원');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.submit();

  I.click('스토어');
  I.click('갈비천왕');
  I.click('+');
  I.click('+');
  I.click('send-present');

  I.fillField('name', '동길홍투');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.submit();

  I.waitForText('To. 동길홍투');

  I.click('To. 동길홍원');

  I.see('1');
  I.see('10,000원');
  I.see(today());
  I.see('동길홍원');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');

  I.click('주문조회');
  I.click('To. 동길홍투');

  I.see('3');
  I.see('30,000원');
  I.see(today());
  I.see('동길홍투');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');
});

Scenario('다른 사람의 주문 세부 정보 확인하는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('send-present');

  I.fillField('name', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.submit();
  I.click('로그아웃');

  I.login('myid2');

  I.amOnPage('/orders/1');

  I.see('접근 권한이 없습니다');
});
