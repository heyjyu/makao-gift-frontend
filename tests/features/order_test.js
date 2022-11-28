Feature('상품 주문 - '
+ '고객은 상품을 주문함으로써 선물을 보내 마음을 전달할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.addItems(1);

  I.amOnPage('/');
  I.login('myId');
});

Scenario('로그인을 하지 않은 경우', ({ I }) => {
  I.click('로그아웃');
  I.click('스토어');
  I.click('갈비천왕');
  I.click('+');
  I.click('선물하기');

  I.fillField('username', 'myId');
  I.fillField('password', 'Abcdef1!');
  I.click('로그인하기');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');
  I.click('To. 동길홍');

  I.see('2');
  I.see('20,000원');
  I.see('잔액: 30,000원');
});

Scenario('로그인을 한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');
  I.click('To. 동길홍');

  I.see('1');
  I.see('10,000원');
  I.see('동길홍');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');
  I.see('잔액: 40,000원');
});

Scenario('메시지 없이 주문하는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.click('선물하기');
  I.click('To. 동길홍');

  I.see('1');
  I.see('10,000원');
  I.see('동길홍');
  I.see('서울시 행복구 행복동');
  I.see('잔액: 40,000원');
});

Scenario('수량을 늘려서 주문한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('+');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');
  I.click('To. 동길홍');

  I.see('2');
  I.see('20,000원');
  I.see('동길홍');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');
  I.see('잔액: 30,000원');
});

Scenario('수량을 줄여서 주문한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('+');
  I.click('-');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');
  I.click('To. 동길홍');

  I.see('1');
  I.see('10,000원');
  I.see('동길홍');
  I.see('서울시 행복구 행복동');
  I.see('행복하세요~');
  I.see('잔액: 40,000원');
});

Scenario('받는 분 성함을 입력하지 않은 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.see('성함을 입력해주세요');
  I.see('잔액: 50,000원');
});

Scenario('주소를 입력하지 않은 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.see('주소를 입력해주세요');
  I.see('잔액: 50,000원');
});

Scenario('3글자 미만의 받는 분 성함을 입력한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.see('성함을 다시 확인해주세요');
  I.see('잔액: 50,000원');
});

Scenario('7글자 초과의 받는 분 성함을 입력한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '홍길동홍길동홍길');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.see('성함을 다시 확인해주세요');
  I.see('잔액: 50,000원');
});

Scenario('100글자 초과의 받는 분 메시지를 입력한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요행복하세요~');
  I.click('선물하기');

  I.see('메시지 길이를 줄여주세요');
  I.see('잔액: 50,000원');
});

Scenario('잔액이 부족한 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('선물하기');

  I.fillField('to', '동길홍');
  I.fillField('address', '서울시 행복구 행복동');
  I.fillField('message', '행복하세요~');
  I.click('선물하기');

  I.see('❌ 잔액이 부족하여 선물하기가 불가합니다 ❌');
  I.see('잔액: 50,000원');
});
