describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });

  it("error auth", () => {

    cy.get('[data-test="username"]').type('qwe');
    cy.get('[data-test="password"]').type('qwe');
    cy.get('[data-test="login-button"]').click();

  });
  it("success auth", () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it("sorting asc price", () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

    cy.get(".select_container").get('[data-test="product-sort-container"]').select("lohi");

    cy.get('[data-test="inventory-list"]').find('[data-test="inventory-item"]')
    describe('Сравнение цен товаров', () => {
      it('Сравнивает цены первого и второго товара', () => {
        cy.visit('https://www.saucedemo.com/inventory.html');
    
        // Получаем и сравниваем цены
        cy.get('.inventory-item-price(1) .price').invoke('text').then(price1 => {
          cy.get('.inventory-item-price(2) .price').invoke('text').then(price2 => {
            
            // Преобразуем строки в числа и сравниваем
            const price1Number = parseFloat(price1.replace('$', '').trim());
            const price2Number = parseFloat(price2.replace('$', '').trim());
    
            expect(price1Number).to.equal(price2Number); // Сравниваем, что цены равны
          });
        });
      });
    });
    
  });
  it("check cart and create order", () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

    cy.get('[data-test="inventory-list"]')
      .find('[data-test="inventory-item"]')
      .then(($items) => {
        cy.wrap($items.eq(0))
          .find('[data-test="add-to-cart-sauce-labs-backpack"]')
          .click();

        cy.wrap($items.eq(1))
          .find('[data-test="add-to-cart-sauce-labs-bike-light"]')
          .click();
      });

    cy.get('[data-test="shopping-cart-link"]')
      .find('[data-test="shopping-cart-badge"]')
      .should("have.text", "2");

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    const firstName = "Test";
    const lastName = "User";
    const Zip = "0000";

    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(Zip);

    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
  });
});