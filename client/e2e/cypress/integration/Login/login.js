import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";


Given('I open login page', () => {
  cy.visit('/login');
})

When('I fill email and password fields', () => {
  cy.get('input[formControlName="email"]').type('hello@email.com');
  cy.get('input[formControlName="password"]').type('hello1234');
})

And('I click on login button', () => {
  cy.get('button[type="submit"]').click();
})

Then('I see home page', () => {
  cy.url().should('contain', '/home');
  cy.get('h1').should('contain', 'Hello hello@email.com')
})
