describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("https://poizon.ru/");
  });

  it("err-registration", () => {
    cy.contains('a', 'Личный кабинет')
    .click(); 
    cy.contains('a', 'Войти с помощью e-mail')
    .click();
    cy.contains('div', 'Регистрация')
    .click();
    cy.contains('div', 'Фамилия').type('123');
    cy.contains('div', 'Имя').type('123');
    cy.contains('div', 'Отчество').type('123');
    cy.contains('div', 'E-mail').type('123');
    cy.contains('div', 'Пароль').type('A12345678');
    cy.contains('div', 'Подтвердите пароль').type('A12345678');
    cy.contains('div', 'Зарегистрироваться')
    .click();
 
  });
  it("-registration", () => {
    cy.contains('a', 'Личный кабинет')
    .click(); 
    cy.contains('a', 'Войти с помощью e-mail')
    .click();
    cy.contains('div', 'Регистрация')
    .click();
    cy.contains('div', 'Фамилия').type('АБВ');
    cy.contains('div', 'Имя').type('АБВ');
    cy.contains('div', 'Отчество').type('АБВ');
    cy.contains('div', 'E-mail').type('123@mail.ru');
    cy.contains('div', 'Пароль').type('A1234567_8');
    cy.contains('div', 'Подтвердите пароль').type('A1234567_8');
    cy.contains('div', 'Зарегистрироваться')
    .click();
 
  });
  it("Auth", () => {
    cy.contains('a', 'Личный кабинет')
    .click(); 
    cy.contains('a', 'Войти с помощью e-mail')
    .click();
    cy.contains('div', 'E-mail').type('123@mail.ru');
    cy.contains('div', 'Пароль').type('A1234567_8');
    cy.contains('div', 'Войти')
    .click();
 
  });
  it("Err-Auth", () => {
    cy.contains('a', 'Личный кабинет')
    .click(); 
    cy.contains('a', 'Войти с помощью e-mail')
    .click();
    cy.contains('div', 'E-mail').type('1234@mail.ru');
    cy.contains('div', 'Пароль').type('A1234567_89');
    cy.contains('div', 'Войти')
    .click();
    cy.get('.v-alert__content')
      .should('be.visible')
      .and('contain.text', 'Неверные данные для входа. Пожалуйста, попробуйте ещё раз');
 
  });
  it("sortyng", () => {
    cy.contains('a', 'Личный кабинет')
    .click(); 
    cy.contains('a', 'Войти с помощью e-mail')
    .click();
    cy.contains('div', 'E-mail').type('123@mail.ru');
    cy.contains('div', 'Пароль').type('A1234567_8');
    cy.contains('div', 'Войти')
    .click();
    cy.visit("https://poizon.ru/");
    cy.contains('div', 'Обувь')
    cy.get('a[href="/cat/shoes"]').click();
    cy.contains('button', 'Сортировка').click();
    cy.contains('label', 'По возрастанию цены').click();
    cy.get('button.app-action-submit').click();
        cy.get('a[href="/product/4707093"]')
          .find('[itemprop="price"]')
          .invoke('attr', 'content')
          .then((price1) => {
            cy.get('a[href="/product/ssdfw231009u"]')
              .find('[itemprop="price"]')
              .invoke('attr', 'content')
              .then((price2) => {
                const price1Number = parseFloat(price1);
                const price2Number = parseFloat(price2);
                if (price1Number < price2Number) {
                  cy.log(`Первый товар дешевле на ${price2Number - price1Number} руб.`);
                } else if (price1Number > price2Number) {
                  cy.log(`Второй товар дешевле на ${price1Number - price2Number} руб.`);
                } else {
                  cy.log('Оба товара имеют одинаковую цену.');
                }
                expect(price1Number).to.be.lessThan(price2Number);
              });
          });
      });
    });
    