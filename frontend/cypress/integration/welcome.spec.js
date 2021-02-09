describe("Welcome page Test", function () {
  it("Welcome page - initial check", function () {
    cy.visit("/");
    cy.contains("Welcome");
  });

  it("Welcome page - check header", function () {
    cy.contains("Smart Campus Dashboard");
  });

  it("Welcome page - check logo", function () {
    cy.get("img").should("be.visible");
  });

  it("Welcome page - click Menu button", function () {
    cy.contains("Open menu").click();
    cy.contains("Menu");
  });

  it("Welcome page - navigate to Boyd Orr", function () {
    cy.contains("Boyd Orr").click();
    cy.url().should("include", "/boyd-orr");
  });
});
