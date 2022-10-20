
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  
  beforeEach(function() {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', function() {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
   })
  
  it('Preenche os campos obrigatórios e envia o formulário', function() {
    const textlong = Cypress._.repeat('Teste ', 50)
    cy.get('#firstName').type('Leandro').should('have.value', 'Leandro'); // # seleciona name
    cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
    cy.get('#email').type('leandro@teste.com').should('have.value', 'leandro@teste.com');
    cy.get('#open-text-area').type(textlong, {delay : 0});
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible');//  .selecionaclasse
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');



  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Leandro').should('have.value', 'Leandro'); 
    cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
    cy.get('#email').type('leandroteste.com').should('have.value', 'leandroteste.com');
    cy.get('#open-text-area').type('TESTE');
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');

  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Leandro').should('have.value', 'Leandro'); 
    cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
    cy.get('#email').type('leandroteste.com').should('have.value', 'leandroteste.com');
    cy.get('#open-text-area').type('TESTE');
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');

  })

  it('Verifica se Telefone continua vazio após digitar text', function() {
    cy.get('#phone')
      .type('abc abc')
      .should('have.value', '');
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function (){
    cy.get('#firstName').type('Leandro').should('have.value', 'Leandro'); 
    cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
    cy.get('#email').type('leandro@teste.com').should('have.value', 'leandro@teste.com');
    cy.get('#phone-checkbox').check().should('be.checked');
    cy.get('#open-text-area').type('TESTE');
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');

  })
  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function (){
    cy.get('#firstName').type('Leandro').should('have.value', 'Leandro'); 
    cy.get('#firstName').clear().should('have.value', ''); 
    cy.get('#lastName').type('Padilha').should('have.value', 'Padilha');
    cy.get('#lastName').clear().should('have.value', '');
    cy.get('#email').type('leandro@teste.com').should('have.value', 'leandro@teste.com');
    cy.get('#email').clear().should('have.value', '');
    cy.get('#phone').type('12345678').should('have.value', '12345678');
    cy.get('#phone').clear().should('have.value', '');

  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');

  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit();
    cy.clock();
    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');

  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
    
  })

  it('seleciona um produto (Mentoria) por seu valor', function(){
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    
  })

  it('seleciona um produto (Blog) por seu indice', function(){
    cy.get('#product').select(1).should('have.value', 'blog');
    
  })

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback' );
    
  })

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]').check()
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function (){
    /*
    cy.get('#email-checkbox').check().should('be.checked');
    cy.get('#phone-checkbox').check().should('be.checked');
    cy.get('#phone-checkbox').uncheck().should('not.be.checked');
    */
    //ou 
    cy.get('input[type="checkbox"]').check().should('be.checked')
      .last().uncheck()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')

      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('ArquivoExemplo');
      cy.get('input[type="file"]')
      .selectFile('@ArquivoExemplo', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')// link "a" dentro da div privacy

  }) 

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')

  }) 

  Cypress._.times(3, function(){ //repete o teste X vezes
    it('testa a página da política de privavidade de forma independente', function(){
      cy.visit('./src/privacy.html');
      cy.contains('Talking About Testing').should('be.visible')
  
    })  

  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function() {
    const textlong = Cypress._.repeat('1234567890', 20)
    cy.get('#open-text-area')
    .invoke('val', textlong)
    .should('have.value', textlong)

  })

  it('faz uma requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response){
      const {status, statusText, body} = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')

    })

  })

  
  it.only('encontra o gato', function() {
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')

  })

})