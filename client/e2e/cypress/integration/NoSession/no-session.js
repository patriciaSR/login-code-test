import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";


Given('Im not logged in page', () => {
  cy.clearSessionStorage().then(() => {
    expect (window.sessionStorage.getItem('userData')).to.be.null
  });
})

And('I open home page', () => {
  cy.visit('/home');
})

Then('I see login page', () => {
  cy.url().should('contain', '/login');
  cy.get('img[alt="karumi-logo"]').should('exist');
})
