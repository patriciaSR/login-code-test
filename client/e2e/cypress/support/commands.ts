// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');

  cy.get('input[formControlName="email"]').type('hello@email.com');
  cy.get('input[formControlName="password"]').type('hello1234');
  cy.get('button[type="submit"]').click();

  cy.wait('@login')
  .its('status')
  .should('be', 200)
  .then((response) => {
    window.sessionStorage.setItem('userData', JSON.stringify(response));
  });
});

Cypress.Commands.add('clearSessionStorage', () => {
  window.sessionStorage.clear();
  cy.log(JSON.stringify(window.sessionStorage));
});
