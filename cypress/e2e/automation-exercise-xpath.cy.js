import { getTimeStamp, getRandomEmail, getRandomNumber } from '../support/helpers.js'
import { faker } from '@faker-js/faker';
import menu from '../modules/login/index.js'; 
import { preencherCadastroPreLogin, preencherFormularioCadastro  } from '../modules/cadastro/index.js';
import 'cypress-mochawesome-reporter/register';
import 'cypress-xpath';

/* 
hooks - ganchos
before -> antes de todos os testes
beforeEach -> antes de cada teste
after -> 1x depois de todos os testes
afterEach -> depois de cada teste
*/

describe('Automation Exercise com XPath', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        menu.navegarParaLogin()
    })

    it('Cadastrar um usuário', () => {
        preencherCadastroPreLogin()
        preencherFormularioCadastro()
    });

    it('Login de Usuário com e-mail e senha corretos', () => {
        cy.xpath('//*[@data-qa="login-email"]').type('qatester-1759531045838@test.com.br')
        cy.xpath('//*[@data-qa="login-password"]').type('12345')
        cy.xpath('//*[@data-qa="login-button"]').click()
        cy.xpath("//*[contains(., 'Logged in as QA Tester Wesley')]").should('be.visible');
    })

    it('Login de Usuário com e-mail e senha incorretos', () => {
        cy.xpath('//*[@data-qa="login-email"]').type('qatester-1759531045838@test.com.br')
        cy.xpath('//*[@data-qa="login-password"]').type('1234d5')
        cy.xpath('//*[@data-qa="login-button"]').click()
        cy.xpath("//*[contains(text(), 'Your email or password is incorrect')]").should('be.visible')
    })

    it('Logout de usuário', () => {
        cy.xpath('//*[@data-qa="login-email"]').type('qatester-1759531045838@test.com.br')
        cy.xpath('//*[@data-qa="login-password"]').type('12345')
        cy.xpath('//*[@data-qa="login-button"]').click()
        // Usando XPath para encontrar um link pelo texto
        cy.xpath("//a[contains(text(), 'Logout')]").should('be.visible').click()
        cy.url().should('contain', '/login')
    })

    it('Cadastrar um usuário existente', () => {
        cy.xpath('//*[@data-qa="signup-name"]').type('QA Tester Wesley')
        cy.xpath('//*[@data-qa="signup-email"]').type(`qatester-1759531045838@test.com.br`)
        cy.xpath("//button[contains(text(), 'Signup')]").click()
        cy.xpath("//*[contains(text(), 'Email Address already exist!')]").should('be.visible')
    });

    it('Exemplos de Logs', () => {
        cy.log(`PGTAS Automação Web`)
        cy.log(`getTimeStamp: ${getTimeStamp()}`)
        cy.log(`getRandomNumber: ${getRandomEmail()}`)
        cy.log(`FirstName: ${faker.person.firstName()}`)
        cy.log(`Random Number: ${getRandomNumber()}`)
    })

    it('Envio de formulário com arquivo "Contact US"', () => {
        cy.xpath('//a[@href="/contact_us"]').click()
        cy.xpath('//*[@data-qa="name"]').type('João da Silva')
        cy.xpath('//*[@data-qa="email"]').type('joaodasilva.teste@teste.com.br')
        cy.xpath('//*[@data-qa="subject"]').type('testando com cypress')
        cy.xpath('//*[@data-qa="message"]').type('my message - test')
        cy.xpath('//input[@type="file" and @name="upload_file"]').selectFile('cypress/fixtures/example.json')
        cy.xpath('//*[@data-qa="submit-button"]').click()
        cy.xpath("//*[contains(text(), 'Success! Your details have been submitted successfully.')]").should('be.visible')
    })
});