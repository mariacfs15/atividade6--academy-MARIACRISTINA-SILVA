export default class CadastroPage {
    inputNome = '#name';
    inputEmail = '#email';
    
    buttonSalvar = 'button[type="submit"]';

    linkPaginaVoltar = '[href="/users]';

    typeNome(nome){
        cy.get(this.inputNome).type(nome);
    }

    typeEmail(email){
        cy.get(this.inputEmail).type(email);
    }

    clickButtonSalvar(){
        cy.get(this.buttonSalvar).click();
    }
}