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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
cy.get('#firstName').type('Leandro').should('have.value', 'Leandro');
cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
cy.get('#email').type('leandro@teste.com').should('have.value', 'leandro@teste.com');
cy.get('#phone-checkbox').click();
cy.get('#phone').type('12345678').should('have.value', '12345678');
cy.get('#open-text-area').type('TESTE');
cy.contains('button', 'Enviar').click();
})

Cypress.Commands.add('fillMandatoryFields', function() {
    cy.get('#firstName').type('Leandro').should('have.value', 'Leandro');
    cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
    cy.get('#email').type('leandro@teste.com').should('have.value', 'leandro@teste.com');
    cy.get('#phone-checkbox').click();
    cy.get('#phone').type('12345678').should('have.value', '12345678');
    cy.get('#open-text-area').type('TESTE');
    })