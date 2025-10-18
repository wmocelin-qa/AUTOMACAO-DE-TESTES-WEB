/// <reference types="cypress" />

import data from '../fixtures/example.json'
import { getTimeStamp, getRandomEmail, getRandomNumber } from '../support/helpers.js'
import { faker } from '@faker-js/faker';
import 'cypress-mochawesome-reporter/register';


/* 
hooks - ganchos
before -> antes de todos os testes
beforeEach -> antes de cada teste
after -> 1x depois de todos os testes
afterEach -> depois de cada teste
*/

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click();
    })
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        //cy.get('[data-qa="signup-name"]').type(`${data.name}`)
        cy.get('[data-qa="signup-name"]').type(`${faker.person.fullName()}`)
        cy.get('[data-qa="signup-email"]').type(`${faker.person.firstName()}-${timestamp}@test.com.br`)
        cy.contains('button', 'Signup').click()
        //cy.get('input[type=radio]').check('Mr')
        cy.get('#id_gender1').check()
        cy.get('[data-qa="password"]').type(`12345`, {log: false})
        // comboboxes ou selects usamos o comando select
        cy.get('#days').select('20')
        cy.get('#months').select('September')
        cy.get('select[data-qa="years"]').select('1998')
        cy.get('[data-qa="first_name"]').type('QA')
        cy.get('[data-qa="last_name"]').type(`${timestamp}`)
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
    });

    it('Login de Usuário com e-mail e senha corretos', () => {
        cy.get('[data-qa="login-email"]').type('qatester-1759531045838@test.com.br')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Logged in as QA Tester Wesley').should('be.visible')
    })

    it('Login de Usuário com e-mail e senha incorretos', () => {
        cy.get('[data-qa="login-email"]').type('qatester-1759531045838@test.com.br')
        cy.get('[data-qa="login-password"]').type('1234d5')
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Your email or password is incorrect').should('be.visible')
    })

    it('Logout de usuário', () => {
        cy.get('[data-qa="login-email"]').type('qatester-1759531045838@test.com.br')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Logout').should('be.visible').click()
        cy.url().should('contain', '/login')
    })

    it('Cadastrar um usuário existente', () => {
        cy.get('[data-qa="signup-name"]').type('QA Tester Wesley')
        cy.get('[data-qa="signup-email"]').type(`qatester-1759531045838@test.com.br`)
        cy.contains('button', 'Signup').click()
        cy.contains('Email Address already exist!').should('be.visible')
    });

    it.only('Exemplos de Logs', () => {
        cy.log(`PGTAS Automação Web`)
        cy.log(`getTimeStamp: ${getTimeStamp()}`)
        cy.log(`getRandomNumber: ${getRandomEmail()}`)
        cy.log(`FirstName: ${faker.person.firstName()}`)
        cy.log(`Random Number: ${getRandomNumber()}`)
    })

    it('Envio de formulário com arquivo "Contact US"', () => {
        cy.get('a[href="/contact_us"]').click()
        cy.get('[data-qa="name"]').type('João da Silva')
        cy.get('[data-qa="email"]').type('joaodasilva.teste@teste.com.br')
        cy.get('[data-qa="subject"]').type('testando com cypress')
        cy.get('[data-qa="message"]').type('my message - test')
        cy.get('input[type="file"][name="upload_file"]').selectFile('cypress/fixtures/example.json')
        cy.get('[data-qa="submit-button"]').click()
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
    })
});