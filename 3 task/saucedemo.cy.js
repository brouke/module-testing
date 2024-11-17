describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });

  it("success auth", () => {
    const username = "standard_user";
    const password = "secret_sauce";

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);

    cy.get('[data-test="login-button"]').click();

    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });
  it("error auth", () => {
    const username = "qwe";
    const password = "secret_sauce";

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);

    cy.get('[data-test="login-button"]').click();

    cy.get(".error-message-container")
      .should("be.visible")
      .find("h3")
      .and(
        "contain.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });

  it("check cart and create order", () => {
    const username = "standard_user";
    const password = "secret_sauce";

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);

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

  it("sorting asc price", () => {
    const username = "standard_user";
    const password = "secret_sauce";

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);

    cy.get('[data-test="login-button"]').click();

    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

    cy.get(".select_container")
      .get('[data-test="product-sort-container"]')
      .select("lohi");

    cy.get('[data-test="inventory-list"]')
      .find('[data-test="inventory-item"]')
      .then(($items) => {
        const price1 = parseFloat(
          $items
            .eq(0)
            .find('[data-test="inventory-item-price"]')
            .text()
            .replace("$", "")
        );
        const price2 = parseFloat(
          $items
            .eq(1)
            .find('[data-test="inventory-item-price"]')
            .text()
            .replace("$", "")
        );

        expect(price1).to.be.lessThan(price2);
      });
  });
});
