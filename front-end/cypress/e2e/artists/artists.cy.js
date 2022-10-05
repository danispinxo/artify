/* eslint-disable cypress/no-force */
describe('artists page renders', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('user can visit artist page without registering/logging in', () => {
    cy.get('[href="/artists"]').click();
    cy.get('#artists-title').contains('Explore All the Artify Artists');
  });

  it('user can select an artist to visit their gallery', () => {
    cy.get('[href="/artists"]').click();
    cy.get(':nth-child(3) > a.card > .category-body > .card-img-top').click();
    cy.contains('Question of Storms');
  });

})