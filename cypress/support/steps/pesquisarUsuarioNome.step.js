import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page.js'

const paginaCadastro = new CadastroPage();

const usuarioinformado = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
}

Given('que acessei a página inicial', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

Given('que existe um usuário cadastrado no sistema', function () {
    
    cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuario');

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');

    paginaCadastro.typeNome(usuarioinformado.name +'a');
    paginaCadastro.typeEmail(usuarioinformado.email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
});

When('clicar no campo de pesquisa e informar nome já cadastrado', () => {
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type(usuarioinformado.name);
});

When('clicar no campo de pesquisa e informar nome não cadastrado', () => {
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type('Maria Joaquila Sales');
});

Then('o usuário será encontrado com sucesso', function ( ) {
    cy.contains('Nome').should('be.visible')
    cy.contains('E-mail').should('be.visible')
    cy.contains('Ver detalhes').should('be.visible')

});

Then('o usuário não será encontrado com sucesso', function ( ) {
    cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible')
    cy.contains('Cadastre um novo usuário').should('be.visible')
});
