describe("Outside Sensors Map Test", function () {
    it("Test Map availability", function () {
      cy.visit("/outside-sensors");
        cy.get(".MicrosoftMap").should("be.visible");
     
    });
});
  