import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";


Given('Im logged in page', () => {
  const { email, password } = Cypress.env('userData').user;

  cy.login(email, password);
})

And('I open home page', () => {
  cy.visit('/home');
})

When('I click on logout button', () => {
  cy.get('button[type="submit"]').click();
})

Then('I see login page', () => {
  cy.url().should('contain', '/login');
  cy.get('img[alt="karumi-logo"]').should('exist');
})
