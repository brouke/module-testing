describe("traversal", () => {
  beforeEach(() => {
    cy.visit("https://demowebshop.tricentis.com/books");
  });

  it("should verify product items have visible titles and prices", () => {
    cy.get(".product-grid .item-box")
      .first()
      .within(() => {
        cy.get(".product-title").should("exist").and("be.visible");
        cy.get(".price").should("exist").and("be.visible");
      });

    cy.get(".product-grid .item-box")
      .last()
      .within(() => {
        cy.get(".product-title").should("exist").and("be.visible");
        cy.get(".price").should("exist").and("be.visible");
      });

    cy.get(".product-grid .item-box")
      .first()
      .next()
      .within(() => {
        cy.get(".product-title").should("exist").and("be.visible");
        cy.get(".price").should("exist").and("be.visible");
      });

    cy.get(".product-grid .item-box")
      .eq(1)
      .prev()
      .within(() => {
        cy.get(".product-title").should("exist").and("be.visible");
        cy.get(".price").should("exist").and("be.visible");
      });

    cy.get(".product-grid .item-box").first().parent(".product-grid");

    cy.get(".product-grid .item-box")
      .find(".buttons")
      .not("input[type=button]");

    cy.get(".product-grid .item-box")
      .first()
      .nextAll()
      .eq(1)
      .find(".product-title a")
      .should("have.text", "Fiction");
  });
});
