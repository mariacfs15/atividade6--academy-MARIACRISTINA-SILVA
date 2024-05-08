export default class ListaUsuarioPage {
  
  listaUsuarios = '#listaUsuarios';
  
  componenteTodosUsuarios = '#listaUsuarios #userData';
  
  buttonVoltarPagina = '#paginacaoVoltar';
  buttonProximaPagina = '#paginacaoProximo';
  labelPaginacaoAtual = '#paginacaoAtual';

  buttonDeletarUsuario = '[data-test="userDataDelete"]';
  buttonVerDetalhesUsuario = '#userDataDetalhe';

  clickButtonProximaPagina() {
    cy.get(this.buttonProximaPagina).click();
  }

  clickButtonVoltarPagina() {
    cy.get(this.buttonVoltarPagina).click();
  }
 
  getListaUsuarios() {
    return cy.get(this.listaUsuarios);
  }

  getComponenteTodosUsuarios() {
    return cy.get(this.componenteTodosUsuarios);
  }
}