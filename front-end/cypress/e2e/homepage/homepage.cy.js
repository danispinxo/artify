describe('homepage opens and runs properly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays the homepage container and header text', () => {
    cy.get('.homepage-container').contains('Explore, collect, and sell ARTs')
  })

  it('displays the categories as links', () => {
    cy.get('.categories-container').contains('Photography');

    cy.get(':nth-child(2) > .card5 > .category-body > .card-img-top').click();

    cy.get(':nth-child(3) > .card > .cat-body').contains('Sara Dar');
  })

  it('displays the carousal', () => {
    cy.get('.categories-container').contains('Photography');

  })

})
