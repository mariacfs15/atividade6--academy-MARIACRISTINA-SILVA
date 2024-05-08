import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page.js'
import ListaUsuarioPage from '../pages/listaUsuarios.page.js';

const paginaCadastro = new CadastroPage();
const paginaLista = new ListaUsuarioPage();


const usuarioCad = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
};


Given('que acessei a página inicial ', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

Given('que existe usuário cadastrado na base de dados', function () {

    cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuario');

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');

    paginaCadastro.typeNome(usuarioCad.name + 'a');
    paginaCadastro.typeEmail(usuarioCad.email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
});

When('existir mais de 6 usuários cadastrados no sistema', function () {

    cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
        statusCode: 200,
        fixture: 'listaDezUsuarios.json',
    }).as('getUsers');

    cy.wait('@getUsers');
});

When('não existir mais de 6 usuários cadastrados na base de dados', function () {

    cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
        statusCode: 200,
        fixture: 'listaQuatroUsuarios.json',
    }).as('getUsers');

    cy.wait('@getUsers');
});

When('existir mais de uma página de usuários cadastrados na base de dados', function () {

    cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
        statusCode: 200,
        fixture: 'paginasdeUsuario.json',
    }).as('getUsers');
});

When('existir uma lista de usuários cadastrada no sistema', function () {

    cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
        statusCode: 200,
        fixture: 'listadeUsuario.json',
    }).as('getUsers');
    cy.wait('@getUsers');
});


When('acessar a página inicial', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

When('não existir nenhum usuário cadastrado na base de dados', function () {

    cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', { statusCode: 200, body: [] }).as('getUsuario');

    cy.wait('@getUsuario')
});

Then('deverá existir uma lista de usuários', () => {
    paginaLista.getListaUsuarios().should('be.visible');
});

Then('o sistema deverá apresentar a opção para cadastrar um novo usuário', () => {
    cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible');
    cy.contains('Cadastre um novo usuário').should('be.visible');
});

Then('o sistema deverá habilitar a opção {string}', () => {

    cy.get(paginaLista.labelPaginacaoAtual).contains('1 de 2').and('be.visible');

    cy.get(paginaLista.buttonVoltarPagina).should('be.disabled');
    cy.get(paginaLista.buttonProximaPagina).should('not.be.disabled');
    cy.get(paginaLista.buttonProximaPagina).should('be.enabled');
    
});

Then('o sistema não deverá habilitar a opção {string}', () => {

    cy.get(paginaLista.buttonVoltarPagina).should('be.disabled').and('be.visible');
    cy.get(paginaLista.buttonProximaPagina).should('be.disabled').and('be.visible');  
    cy.get(paginaLista.labelPaginacaoAtual).contains('1 de 1').and('be.visible');
});

Then('o sistema deverá permitir o avanço entre elas', () => {

    cy.wait('@getUsers').then((consultaUsuarios) => {
        const quantidadeUsuarios = consultaUsuarios.response.body.length;
        const quantidadePaginas = Math.floor(quantidadeUsuarios / 6);
  
        // utilizando laço de repetição for, que será executado até a quantidadePaginas-1
        for (var i = 0; i < quantidadePaginas-1 ; i++) {
          paginaLista.clickButtonProximaPagina();
        }
  
        cy.contains(paginaLista.labelPaginacaoAtual, '3 de 3');
        cy.get(paginaLista.buttonVoltarPagina).should('be.enabled');
        cy.get(paginaLista.buttonProximaPagina).should('be.disabled');
        
    });
});

Then('o sistema deverá permitir voltar para a página anterior', () => {

    cy.wait('@getUsers').then((consultaUsuarios) => {
        const quantidadeUsuarios = consultaUsuarios.response.body.length;
        const quantidadePaginas = Math.floor(quantidadeUsuarios / 6);
  
        for (var i = 0; i < quantidadePaginas-1; i++) {
          paginaLista.clickButtonProximaPagina();
        }
  
        for (var i = 0; i < quantidadePaginas-1 ; i++) {
          paginaLista.clickButtonVoltarPagina();
        }
  
        cy.contains(paginaLista.labelPaginacaoAtual, '1 de 3');
        cy.get(paginaLista.buttonVoltarPagina).should('be.disabled');
        cy.get(paginaLista.buttonProximaPagina).should('be.enabled');
        
    });
});

Then('o sistema deverá habilitar as opções de detalhes e exclusão dos usuários', () => {

    paginaLista.getComponenteTodosUsuarios()
      .each((componenteUsuario) => {
        cy.wrap(componenteUsuario).find(paginaLista.buttonDeletarUsuario).should('be.visible');
        cy.wrap(componenteUsuario).find(paginaLista.buttonVerDetalhesUsuario).should('be.visible');
        
      });
  });
