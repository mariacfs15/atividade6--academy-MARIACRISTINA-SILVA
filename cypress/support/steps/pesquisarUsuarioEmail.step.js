import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page.js'

const paginaCadastro = new CadastroPage();

const usuarioCadastrado = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
}

Given('que acessei a página inicial', () => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

Given('que já existe um usuário cadastrado', function () {
    
    cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuario');

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');

    paginaCadastro.typeNome(usuarioCadastrado.name +'a');
    paginaCadastro.typeEmail(usuarioCadastrado.email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
});

When('clicar no campo de pesquisa e informar um e-mail já cadastrado', () => {
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type(usuarioCadastrado.email);
});

When('clicar no campo de pesquisa e informar um e-mail não cadastrado', () => {
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type('aksdmasndjands@qa.com');
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
