Feature('페이지네이션 - 고객은 페이지를 쉽게 이동해서 원하는 선물을 고를 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('아이템이 없는 경우', ({ I }) => {
  I.click('스토어');

  I.dontSee('1');
  I.dontSee({ name: 'previous' });
  I.dontSee({ name: 'next' });
});

Scenario('아이템이 1개인 경우 ', ({ I }) => {
  I.addItems(1);

  I.amOnPage('/');

  I.click('스토어');

  I.see('1');
  I.seeElement({ css: 'button[title=previous][disabled]' });
  I.seeElement({ css: 'button[title=next][disabled]' });
});

Scenario('아이템이 9개인 경우', ({ I }) => {
  I.addItems(9);

  I.amOnPage('/');

  I.click('스토어');

  I.click('2');
  I.see('갈비천왕');
  I.dontSeeElement({ css: 'button[title=previous][disabled]' });
  I.seeElement({ css: 'button[title=next][disabled]' });
});

Scenario('아이템이 81개인 경우', ({ I }) => {
  I.addItems(81);

  I.amOnPage('/');

  I.click('스토어');

  I.see('1');
  I.see('2');
  I.see('3');
  I.see('4');
  I.see('5');
  I.see('11');

  I.seeElement({ css: 'button[title=previous][disabled]' });
  I.dontSeeElement({ css: 'button[title=next][disabled]' });
});

Scenario('다음 버튼을 누르는 경우', ({ I }) => {
  I.addItems(81);

  I.amOnPage('/');

  I.click('스토어');

  I.click({ name: 'next' });
  I.click({ name: 'next' });
  I.click({ name: 'next' });
  I.click({ name: 'next' });

  I.see('6');

  I.dontSeeElement({ css: 'button[title=previous][disabled]' });
  I.dontSeeElement({ css: 'button[title=next][disabled]' });
});

Scenario('이전 버튼을 누르는 경우', ({ I }) => {
  I.addItems(81);

  I.amOnPage('/');

  I.click('스토어');

  I.click({ name: 'next' });
  I.click({ name: 'previous' });

  I.see('1');
  I.see('2');
  I.see('3');
  I.see('4');
  I.see('5');
  I.see('11');

  I.seeElement({ css: 'button[title=previous][disabled]' });
  I.dontSeeElement({ css: 'button[title=next][disabled]' });
});
