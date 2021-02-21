describe("Map Sensors Test", function () {
  it("Test OutsideSensors Map availability", function () {
    cy.visit("/outside-sensors");
    cy.get(".MicrosoftMap").should("be.visible");
  });
  it("Test Parking Spaces Map availability", function () {
    cy.visit("/parking-spaces");
    cy.get(".MicrosoftMap").should("be.visible");
  });
});
