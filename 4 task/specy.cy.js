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
    cy.get(".v-alert_wrapper").should("be.visible")
    .and('contain.text', 'Введите правильный адрес электронной почты');
 
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
    cy.contains('div', 'Зарегистрироваться').click();
        cy.intercept({
            method: 'GET',
            url: 'https://poizon.ru/graphql'
          }).as('getUserData');
         cy.visit('https://poizon.ru/customer/login/email?registration=');
        cy.wait('@getUserData').then((interception) => {
          expect(interception.request.method).to.eq('GET');
          expect(interception.response.statusCode).to.eq(200);
        });

  
 
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
        cy.intercept({
            method: 'GET',
            url: 'https://poizon.ru/graphql?query=fragment+UserDataFragment+on+User%7Bid+givenName%3Agiven_name+familyName%3Afamily_name+middleName%3Amiddle_name+phone+birthday+email+city+street+building+apartment+deposit+cart%7Bid+__typename%7DhasDocs+emailVerifyAt%3Aemail_verified_at+phoneVerifyAt%3Aphone_verified_at+__typename%7Dquery+getCustomer%7Bprofile%7B...UserDataFragment+__typename%7D%7D&operationName=getCustomer&variables=%7B%7D'
          }).as('getUserData');
         cy.visit('https://poizon.ru/customer/login/email');
        cy.wait('@getUserData').then((interception) => {
          expect(interception.request.method).to.eq('GET');
          expect(interception.response.statusCode).to.eq(200);
        });
 
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
          cy.intercept({
              method: 'GET',
              url: 'https://poizon.ru/graphql'
            }).as('getUserData');
           cy.visit('https://poizon.ru/customer/login/email');
           y.wait('@apiResponse').then((interception) => {
            expect(interception.response).to.have.property('body').and.to.be.an('object');
            const accessToken = responseBody.accessToken;
            const refreshToken = responseBody.refreshToken;
            cy.log(`accessToken: ${accessToken}`);
            cy.log(`refreshToken: ${refreshToken}`);

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
  it("buy"), () => {
    cy.contains('a', 'Личный кабинет')
    .click(); 
    cy.contains('a', 'Войти с помощью e-mail')
    .click();
    cy.contains('div', 'E-mail').type('123@mail.ru');
    cy.contains('div', 'Пароль').type('A1234567_8');
    cy.contains('div', 'Войти')
    .click();
    cy.visit("https://poizon.ru/");
    cy.get('.app-product-list__item').contains('New Balance NB 530 White Silver Navy D').parents('a').click(); 
    cy.contains('span', 'EU 36').parents('.app-product-sizes-list__item').click();
    cy.contains('button', 'В корзину').click();
    cy.get('a[href="/checkout/cart"]').click();
    cy.contains('button', 'Перейти к оформлению').click();
  }
    });
});
});