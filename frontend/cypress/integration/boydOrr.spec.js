describe("Boyd Orr Test", function () {
  it("Test arbitrary Display Box", function () {
    cy.visit("/boyd-orr");

    cy.get(".displaybox")
      .should("contain", "Current value")
      .and("contain", "time")
      .and("contain", "value");
  });

  it("Test if each display box corresponds to a graph", function () {
    let tested = cy.get(".displaybox").its("length");
    tested.should("eq", 10);
  });

  it("Test the number of graphs", function () {
    let tested = cy.get("svg").its("length");
    tested.should("eq", 10);
  });

  it("Test if correct number of levels is displayed", function () {
    let tested = cy.get(".level").its("length");
    tested.should("eq", 3);
  });
});
