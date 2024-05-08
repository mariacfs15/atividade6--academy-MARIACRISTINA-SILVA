import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';
import AtualizarUsuarioPage from '../pages/atualizar.page.js'
import CadastroPage from '../pages/cadastro.page.js'

const paginaAtualizar = new AtualizarUsuarioPage();
const paginaCadastro = new CadastroPage();

var idUsuario;
var name = faker.person.firstName() + 'a';
var email = faker.internet.email();

Before( { tags: '@atualizarUsuario'}, () => {
    cy.request('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
        name: name,
        email: email,
    }).then((response) => {
        idUsuario = response.body.id;
    });
});

const usuarioInfo = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
};

Given('que existe um usuário cadastrado no banco de dados', function () {
    
    cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuario');

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');

    paginaCadastro.typeNome(usuarioInfo.name + 'a');
    paginaCadastro.typeEmail(usuarioInfo.email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
});

Given('que acessei a página inicial', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

When('consultar usuário através do seu identificador único', () => {
    cy.request('https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users/' + idUsuario).then((response) => {
        expect(response.status).to.equal(200);
    });
});

When('acessar a página do usuário', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/' + idUsuario);
});

When('tentar acessar a página do usuário com um identificador qualquer', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/982354135413513143515413');
});

When('clicar na opção editar', () => {
    cy.contains('Editar').click();
});

When('alterar o campo nome, com um nome válido', () => {
    paginaAtualizar.clearNome();
    paginaAtualizar.typeNome(faker.person.firstName() + 'a');
});

When('alterar o campo e-mail, com um e-mail válido', () => {
    paginaAtualizar.clearEmail(email);
    
    var novoEmail = faker.internet.email();
    paginaAtualizar.typeEmail(novoEmail);
});

When('alterar o campo e-mail, informando um novo e-mail já cadastrado por outro usuário', () => {
    paginaAtualizar.clearEmail();
    
    paginaAtualizar.typeEmail(usuarioInfo.email);
});


When('salvar a operação', () => {
    cy.contains('Salvar').click();
});

When('alterar o campo nome, colocando um nome com mais de 100 caracteres', function () {
    paginaAtualizar.clearNome();

    paginaAtualizar.typeNome('Maria Julieta Avelino Castro Torres Silva Sales Guimarães Santos Drummond Fernandes Oliveira Teixeira da Costa Souto');
});

When('alterar o campo nome, colocando um nome com menos de 4 caracteres', function () {
    paginaAtualizar.clearNome();

    paginaAtualizar.typeNome('Dan');
});

When('alterar o campo e-mail, informando um novo e-mail com mais de 60 caracteres', function () {
    paginaAtualizar.clearEmail();

    paginaAtualizar.typeEmail('paulapimentaguimaraessoutoaguiarsilvadrummond123457890245678@qa.com');
});

When('alterar o campo e-mail, informando um novo e-mail inválido {string}', function (email) {
    paginaAtualizar.clearEmail();
    
    paginaAtualizar.typeEmail(email);
});

When('alterar o campo nome, colocando um nome com formato inválido {string}', function (nome) {
    paginaAtualizar.clearNome();

    paginaAtualizar.typeNome(nome);
});

Then('será possível visualizar as informações do usuário', () => {
    cy.contains('id').should('be.visible');
    cy.contains('Nome').should('be.visible');
    cy.contains('E-mail').should('be.visible');

});

Then('não será possível visualizar as informações do usuário', () => {
    cy.contains('Usuário não encontrado').should('be.visible');
    cy.contains('Não foi possível localizar o usuário').should('be.visible');
    cy.contains('Cancelar').should('be.visible');
});

Then('o usuário deverá ser atualizado com sucesso e o sistema apresentará a mensagem {string}', function (sucesso) {
    cy.contains(sucesso).should('be.visible')
});

Then('o usuário não deverá ser atualizado com sucesso e o sistema apresentará uma mensagem', function () {
    cy.contains('Informe no máximo 100 caracteres para o nome').should('be.visible')
});

Then('não deve ser possível extrapolar a quantidade de 60 caracteres no e-mail do usuário', function () {
    cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible')
});

Then('o usuário não poderá ser alterado e o sistema apresentará uma mensagem', function () {
    cy.contains('Informe pelo menos 4 letras para o nome').should('be.visible')
});

Then('o usuário não será salvo com sucesso e o sistema apresenta a mensagem {string}', function (emailInvalido) {
    cy.contains(emailInvalido).should('be.visible')
});

Then('o usuário não poderá ser alterado e o sistema apresentará a mensagem {string}', function (nomeInvalido) {
    cy.contains(nomeInvalido).should('be.visible')
});

Then('o usuário não é atualizado com sucesso e o sistema devolve o erro {string}', function (mensagem) {
    cy.contains(mensagem).should('be.visible')
    cy.contains('Erro').should('be.visible')
    cy.contains('Cancelar').should('be.visible')
});