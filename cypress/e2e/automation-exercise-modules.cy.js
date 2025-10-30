/// <reference types="cypress" />

import menu from '../modules/menu/index.js'; 
import { preencherCadastroPreLogin, preencherFormularioCadastro, realizarCadastroComDadosExistentes } from '../modules/cadastro/index.js';
import { realizarEnvioFormContato, verificarAssinatura } from '../modules/contato/index.js'
import { loginUsuarioSenhaCorreto, loginUsuarioSenhaIncorreto, realizarLogoutUsuario } from '../modules/login/index.js'
import { verificarProdutosEDetalhes, pesquisarProduto } from '../modules/produtos/index.js'
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
        cy.viewport('iphone-xr');
        cy.visit('https://automationexercise.com/');
    });

    describe('Testes de Login, Registro e Logout', () => {
        beforeEach(() => {
            menu.navegarParaLogin();
        });

        it('Registrar usuário com sucesso', () => {
            preencherCadastroPreLogin();
            preencherFormularioCadastro();
        });

        it('Login de Usuário com e-mail e senha corretos', () => {
            loginUsuarioSenhaCorreto();
        });

        it('Login de Usuário com e-mail e senha incorretos', () => {
            loginUsuarioSenhaIncorreto();
        });

        it('Logout de usuário', () => {
            realizarLogoutUsuario();
        });

        it('Cadastrar um usuário existente', () => {
            realizarCadastroComDadosExistentes();
        });
    });

    describe('Testes sem acesso a login', () => {
        
        it('Envio de formulário com arquivo "Contact US"', () => {
            realizarEnvioFormContato();
        });

        it('Verificar todos os produtos e a página de detalhes do produto', () => {
            verificarProdutosEDetalhes();
        });

        it('Realizar pesquisa de produto', () => {
            pesquisarProduto()
        })

        it('Verificar assinatura rodapé', () => {
            verificarAssinatura()
        })
    });
});