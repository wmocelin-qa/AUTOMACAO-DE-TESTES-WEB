/// <reference types="cypress" />

import menu from '../modules/menu/index.js'; 
import { preencherCadastroPreLogin, preencherFormularioCadastro, realizarCadastroComDadosExistentes } from '../modules/cadastro/index.js';
import { realizarEnvioFormContato } from '../modules/contato/index.js'
import { loginUsuarioSenhaCorreto, loginUsuarioSenhaIncorreto, realizarLogoutUsuario } from '../modules/login/index.js'
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

    it('Registrar usuário com sucesso', () => {
        preencherCadastroPreLogin()
        preencherFormularioCadastro()
    })

    it('Login de Usuário com e-mail e senha corretos', () => {
        loginUsuarioSenhaCorreto()
    })

    it('Login de Usuário com e-mail e senha incorretos', () => {
        loginUsuarioSenhaIncorreto()
    })

    it('Logout de usuário', () => {
        realizarLogoutUsuario()
    })

    it('Cadastrar um usuário existente', () => {
        realizarCadastroComDadosExistentes()
    });

    it('Envio de formulário com arquivo "Contact US"', () => {
       realizarEnvioFormContato()
    })
});