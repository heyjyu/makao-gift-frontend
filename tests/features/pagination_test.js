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
  I.see({ css: 'button[name=previous][disabled]' });
  I.see({ css: 'button[name=next][disabled]' });
  I.dontSee('2');
});

Scenario('아이템이 9개인 경우', ({ I }) => {
  I.addItems(9);

  I.amOnPage('/');

  I.click('스토어');

  I.click('2');
  I.see('갈비천왕');
  I.see({ css: 'button[name=previous][disabled]' });
  I.see({ css: 'button[name=next][disabled]' });
});

Scenario('아이템이 81개인 경우', ({ I }) => {
  I.addItems(81);

  I.amOnPage('/');

  I.click('스토어');

  I.see({ css: 'button[name=previous][disabled]' });
  I.dontSee({ css: 'button[name=next][disabled]' });
  I.see({ css: 'button[name=next][disabled=false]' });
});

Scenario('다음 버튼을 누르는 경우', ({ I }) => {
  I.addItems(81);

  I.amOnPage('/');

  I.click({ name: 'next' });

  I.see('11');
  I.see({ css: 'button[name=previous][disabled=false]' });
  I.see({ css: 'button[name=next][disabled]' });
});

Scenario('이전 버튼을 누르는 경우', ({ I }) => {
  I.addItems(81);

  I.amOnPage('/');

  I.click({ name: 'next' });
  I.click({ name: 'previous' });

  I.dontSee('11');
  I.see({ css: 'button[name=previous][disabled]' });
  I.see({ css: 'button[name=next][disabled=false]' });
});
