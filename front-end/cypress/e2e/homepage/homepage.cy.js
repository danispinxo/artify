/* eslint-disable cypress/no-force */
describe('homepage opens and runs properly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('displays the homepage carousel and header text', () => {
    cy.get('.homepage-container').contains('Explore, collect, and sell ARTs');
    cy.get('.mySwiper');
  });

  it('displays the categories as links', () => {
    cy.get('.categories-container').contains('Photography');
    cy.get(':nth-child(2) > .card5 > .category-body > .card-img-top').click();
    cy.get(':nth-child(3) > .card > .cat-body').contains('Sara Dar');
  });

  it('user can register from homepage', () => {
    cy.get('[href="/register"]').click().contains('Register');
    cy.get('#form3Example1').type('Kenneth', {force: true} );
    cy.get('#form3Example2').type('Jortons III', {force: true} );
    cy.get('#form3Example3').type('k.jortons@mail.com', {force: true} );
    cy.get('form > :nth-child(3) > #form3Example4').type('password', {force: true});
    cy.get('.btn').click({force: true});
    cy.get('.navbar').contains('Kenneth')
  });

  it('user can log in and out of existing account from the homepage', () => {
    cy.get('[href="/login"]').click();
    cy.get('#form3Example3').type("k.jortons@mail.com", {force: true});
    cy.get(':nth-child(2) > #form3Example4').type('password', {force: true});
    cy.get('.btn').click({force: true});
    cy.get('[href="/login"]').click({force: true});
    cy.get('#logout-button').click({force: true})
    cy.get('.navbar').contains('Login');
  });


})
