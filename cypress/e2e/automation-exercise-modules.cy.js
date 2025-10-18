/// <reference types="cypress" />

import { getTimeStamp, getRandomEmail, getRandomNumber } from '../support/helpers.js'
import { faker } from '@faker-js/faker';
import menu from '../modules/login/index.js'; 
import { preencherCadastroPreLogin, preencherFormularioCadastro  } from '../modules/cadastro/index.js';
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
        menu.navegarParaLogin()
    })
    it.only('Cadastrar um usuário', () => {
        preencherCadastroPreLogin()
        preencherFormularioCadastro()
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

    it('Exemplos de Logs', () => {
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