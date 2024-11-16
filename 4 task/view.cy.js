describe("viewport", () => {
  beforeEach(() => {
    cy.visit("https://demowebshop.tricentis.com/");
  });

  it("should display header elements correctly on different viewports", () => {
    cy.viewport(1280, 720);

    cy.get(".header-logo").should("be.visible");
    cy.get(".search-box").should("be.visible");
    cy.get(".top-menu").should("be.visible");

    cy.get(".ico-cart").should("be.visible");

    cy.viewport("ipad-2");

    cy.get(".header-logo").should("be.visible");
    cy.get(".search-box").should("be.visible");

    cy.get(".top-menu").should("be.visible");

    cy.get(".ico-cart").should("be.visible");

    cy.viewport("iphone-6");

    cy.get(".header-logo").should("be.visible");

    cy.get("#mob-menu-button").should("be.visible");

    cy.get("#mob-menu-button").click();
    cy.get(".top-menu").should("not.be.visible");

    cy.get(".ico-cart").should("be.visible");
  });
});
