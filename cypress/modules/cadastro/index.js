import { faker } from '@faker-js/faker';
import { getRandomNumber } from '../../support/helpers';

export function preencherCadastroPreLogin() {
    cy.get('input[data-qa="signup-name"]').type(`${faker.person.fullName()}`)
    cy.get('[data-qa="signup-email"]').type(`${faker.person.firstName()}-${getRandomNumber()}@test.com.br`)
    cy.contains('button', 'Signup').click()
}

export function preencherFormularioCadastro() {
    cy.get('#id_gender1').check()
        cy.get('[data-qa="password"]').type(`12345`, {log: false})
        // comboboxes ou selects usamos o comando select
        cy.get('#days').select('20')
        cy.get('#months').select('September')
        cy.get('select[data-qa="years"]').select('1998')
        cy.get('[data-qa="first_name"]').type('QA')
        cy.get('[data-qa="last_name"]').type(`${getRandomNumber()}`)
        cy.get('[data-qa="company"]').type('PGATS')
        cy.get('[data-qa="address"]').type('First Avenue')
        cy.get('[data-qa="address2"]').type('Nº 10')
        cy.get('input[type="checkbox"]#newsletter').check()
        cy.get('input[type="checkbox"]#optin').check()

        cy.get('#country').select('Canada')
        cy.get('[data-qa="state"]').type('Alberta')
        cy.get('[data-qa="city"]').type('Calgary')
        cy.get('[data-qa="zipcode"]').type('894594622')
        cy.get('[data-qa="mobile_number"]').type('48919481245433')
        cy.get('[data-qa="create-account"]').click()

            cy.url().should('includes', 'account_created')
}