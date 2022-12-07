Feature('상품 선택 - '
+ '고객은 상품과 개수를 선택함으로써 원하는 만큼 선물을 할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.addItems(1);

  I.amOnPage('/');
});

Scenario('수량을 늘리는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');

  I.click('+');

  I.see('2');
  I.see('20,000원');
});

Scenario('수량을 줄이는 경우', ({ I }) => {
  I.click('스토어');
  I.click('갈비천왕');

  I.seeElement({ css: 'button[disabled]' });
  I.click('+');
  I.dontSeeElement({ css: 'button[disabled]' });
  I.click('-');

  I.see('1');
  I.see('10,000원');
});
