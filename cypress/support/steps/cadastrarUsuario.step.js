import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page.js'

const paginaCadastro = new CadastroPage();

const usuarioCriado = {
    name: faker.person.firstName() + 'a',
    email: faker.internet.email(),
  };
  
Given('que existe um usuário cadastrado', function () {
    
    cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuario');

    paginaCadastro.typeNome(usuarioCriado.name +'a');
    paginaCadastro.typeEmail(usuarioCriado.email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
});

Given('que acessei a página de cadastro', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
});

When('informar um novo nome', () => {
    paginaCadastro.typeNome(faker.person.firstName() + 'a');
});

When('informar um novo e-mail', () => {
    var email = faker.internet.email();
    paginaCadastro.typeEmail(email);
});

When('salvar a operação', () => {
    paginaCadastro.clickButtonSalvar();  
});

When('completar a operação', () => {   
    paginaCadastro.clickButtonSalvar();
});

When('informar um nome {string}', function (nome) {
    paginaCadastro.typeNome(nome);
});

When('informar um e-mail {string}', function (email) {
    paginaCadastro.typeEmail(email);
});

When('informar um nome com menos de 4 caracteres', function () {
    paginaCadastro.typeNome('Dan');
});

When('informar um nome com mais de 100 caracteres', function () {
    paginaCadastro.typeNome('Maria Julieta Avelino Castro Torres Silva Sales Guimarães Santos Drummond Fernandes Oliveira Teixeira da Costa Souto');
});

When('informar um novo e-mail com mais de 60 caracteres', function () {
    paginaCadastro.typeEmail('paulapimentaguimaraessoutoaguiarsilvadrummond123457890245678@qa.com');
});

When('não informar nenhum dado', function () {
    paginaCadastro.typeEmail(' ');
});

When('informar um e-mail já cadastrado', function () {
    paginaCadastro.typeEmail(usuarioCriado.email);

});

Then('o usuário será salvo com sucesso', () => {
    cy.contains('Usuário salvo com sucesso!').should('be.visible')
});


Then('o usuário não será salvo com sucesso', function ( ) {
    cy.contains('O campo nome é obrigatório.').should('be.visible')
    cy.contains('O campo e-mail é obrigatório.').should('be.visible')
});

Then('não deve ser possível cadastrar o usuário e sistema retorna a mensagem {string}', function (nomeIncompleto) {
    cy.contains(nomeIncompleto).should('be.visible')
});

Then('não consigo fazer meu cadastro e o sistema apresenta a mensagem {string}', function (nomeObrigatorio) {
    cy.contains(nomeObrigatorio).should('be.visible')
});

Then('não consigo fazer meu cadastro e o sistema apresenta a mensagem {string}', function (emailObrigatorio) {
    cy.contains(emailObrigatorio).should('be.visible')
});

Then('o usuário não será salvo com sucesso e o sistema apresenta a mensagem {string}', function (nomeInvalido) {
    cy.contains(nomeInvalido).should('be.visible')
});

Then('o usuário não será salvo com sucesso e o sistema apresenta a seguinte mensagem: {string}', function (emailInvalido) {
    cy.contains(emailInvalido).should('be.visible')
});

Then('não deve ser possível extrapolar a quantidade de 100 caracteres no nome de usuário', function () {
    cy.contains('Informe no máximo 100 caracteres para o nome').should('be.visible')
});

Then('não deve ser possível extrapolar a quantidade de 60 caracteres no e-mail do usuário', function () {
    cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible')
});

Then('não deve ser possível criar o usuário e o sistema devolverá a mensagem {string}', function (mensagem) {
    cy.contains(mensagem).should('be.visible')
    cy.contains('Erro').should('be.visible')
    cy.contains('Cancelar').should('be.visible')
});