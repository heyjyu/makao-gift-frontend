function today() {
  const date = new Date();

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

Feature('주문 세부 정보 확인 - '
+ '고객은 주문 세부 정보를 확인함으로써 새로 선물을 보낼 때 주소, 메시지 정보를 활용할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.addItems(1);

  I.amOnPage('/');
  I.login('myId');
});

Scenario('나의 주문 세부 정보 확인하는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍1');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.click('스토어');
  I.click('갈비천왕');
  I.click('+');
  I.click('+');
  I.click('선물하기');

  I.fillField('to', '동길홍2');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.click('To. 동길홍1');

  I.see('1');
  I.see('10,000원');
  I.see(today());
  I.see('동길홍1');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');

  I.click('주문조회');
  I.click('To. 동길홍2');

  I.see('2');
  I.see('20,000원');
  I.see(today());
  I.see('동길홍2');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');
});

Scenario('다른 사람의 주문 세부 정보 확인하는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');
  I.click('로그아웃');

  I.login('MyId');

  I.amOnPage('/orders/1');

  I.see('접근 권한이 없습니다');
});
