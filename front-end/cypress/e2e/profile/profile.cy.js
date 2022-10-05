/* eslint-disable cypress/no-force */
describe('profile runs correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('user can register and navigate to profile', () => {
    cy.get('[href="/register"]').click().contains('Register');
    cy.get('#form3Example1').type('Kenneth', {force: true} );
    cy.get('#form3Example2').type('Jortons III', {force: true} );
    cy.get('#form3Example3').type('k.jortons@mail.com', {force: true} );
    cy.get('form > :nth-child(3) > #form3Example4').type('password', {force: true});
    cy.get('.btn').click({force: true});
    cy.get('.navbar').contains('Your Profile');
    cy.get('#user-profile-link').click({force: true});
    cy.get('.profile').contains(`Kenneth Jortons III's Profile`);
  });

  it('user can edit profile', () => {
    cy.get('[href="/login"]').click().contains('Login');
    cy.get('#form3Example3').type("k.jortons@mail.com", {force: true});
    cy.get(':nth-child(2) > #form3Example4').type('password', {force: true});
    cy.get('.btn').click({force: true});
    cy.get('#user-profile-link').click({force: true})
    cy.get('.profile-buttons > :nth-child(3)').click({force: true});
    cy.get('.edit-profile > h1').contains('Edit Your Profile');
    cy.get('#change-first-name').type('Frankis', {force: true});
    cy.get('#change-last-name').type('Potato', {force: true});
    cy.get('#change-bio').type('Je suis un patate.', {force: true});
    cy.get('.edit-form > form > .button').click({force: true});
    cy.get('.profile').contains(`Frankis Potato's Profile`);
  });


})
