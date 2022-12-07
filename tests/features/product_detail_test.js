Feature('상품 세부 정보 확인 - '
+ '고객은 상품의 세부 정보를 확인함으로써 상품을 구매할지 결정할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.addItems(1);

  I.amOnPage('/');
});

Scenario('상품 세부 정보를 확인하는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');

  I.see('갈비천왕+콜라1.25L');
  I.see('10,000원');
  I.see('제조사');
  I.see('굽네치킨');
  I.see('구매수량');
  I.see('1');
  I.see('상품설명');
});
