describe("Library Test", function () {
    it("Test arbitrary Display Box", function () {
      cy.visit("/library");
  
      cy.get(".displaybox")
      .should("contain", "Current value")
      .and("contain", "time")
      .and("contain", "value");
    });
  
    it("Test the number of display boxes", function () {
      let tested = cy.get(".displaybox").its("length");
      tested.should("eq", 4);
    });

    it("Test the number of graphs", function () {
        let tested = cy.get("svg").its("length");
        tested.should("eq", 4);
      });
  
    it("Test if correct number of levels is displayed", function () {
      let tested = cy.get(".level").its("length");
      tested.should("eq", 2);
    });
  });
  