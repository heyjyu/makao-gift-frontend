Feature('상품 목록 확인 - '
+ '고객은 상품 목록을 봄으로써 상품들을 비교해서 상품을 고를 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('상품이 없는 경우', ({ I }) => {
  I.click('스토어');

  I.see('상품이 존재하지 않습니다');
});

Scenario('상품이 있는 경우', ({ I }) => {
  I.addItems(1);

  I.amOnPage('/');

  I.click('스토어');

  I.dontSee('상품이 존재하지 않습니다');
  I.see('굽네치킨');
  I.see('갈비천왕+콜라1.25L');
  I.see('10,000원');
});
