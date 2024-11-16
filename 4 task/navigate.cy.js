describe("navigation", () => {
  it("should navigate through categories and verify content", () => {
    cy.visit("https://demowebshop.tricentis.com/");

    cy.get(".top-menu li").find('a[href="/books"]').click();
    cy.url().should("include", "/books");

    cy.get("h1").should("contain.text", "Books");

    cy.go("back");
    cy.location("pathname").should("not.include", "navigation");

    cy.get(".top-menu li").find('a[href="/electronics"]').click();
    cy.url().should("include", "/electronics");

    cy.location("pathname").should("include", "/electronics");

    cy.go(-1);
    cy.location("pathname").should("not.include", "navigation");
  });
});
