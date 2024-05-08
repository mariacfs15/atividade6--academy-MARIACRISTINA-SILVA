export default class AtualizarUsuarioPage {
  
    inputNome = '#userName';
    inputEmail = '#userEmail';
     
    typeNome(nome){
        cy.get(this.inputNome).type(nome);
    }

    clearNome(nome){
      cy.get(this.inputNome).clear(nome);
  }

    typeEmail(email){
        cy.get(this.inputEmail).type(email);
    }

    clearEmail(email){
      cy.get(this.inputEmail).clear(email);
  }

    clickButtonCancelar(){
      cy.get(this.buttonSalvar).click();
  }
}