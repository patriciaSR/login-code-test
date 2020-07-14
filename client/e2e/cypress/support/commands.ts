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
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl'),
    body: {
      email,
      password
    }
  })
  .then((response) => {
    window.sessionStorage.setItem('userData', JSON.stringify(response.body));
  });
});

Cypress.Commands.add('clearSessionStorage', () => {
  window.sessionStorage.clear();
  cy.log(JSON.stringify(window.sessionStorage));
});
