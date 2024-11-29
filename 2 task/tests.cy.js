describe('Tests calc', () => {

    beforeEach(() => {
      cy.visit('C:\Users\typev\Documents\GitHub\module-testing'); 
    });
  
    it('input number', () => {
      cy.get('#display').should('have.value', '');
  
      cy.get('.button').contains('7').click();
      cy.get('#display').should('have.value', '7');
  
      cy.get('.button').contains('3').click();
      cy.get('#display').should('have.value', '73');
  
      cy.get('.button').contains('1').click();
      cy.get('#display').should('have.value', '731');
    });
  
    it('test summ', () => {
      cy.get('.button').contains('5').click();
      cy.get('.button').contains('+').click();
      cy.get('.button').contains('3').click();
      cy.get('.button').contains('=').click();
  
      cy.get('#display').should('have.value', '8');
    });
  
    it('test next operation', () => {
      cy.get('.button').contains('9').click();
      cy.get('.button').contains('-').click();
      cy.get('.button').contains('4').click();
      cy.get('.button').contains('=').click();
  
      cy.get('#display').should('have.value', '5');
  
      cy.get('.button').contains('6').click();
      cy.get('.button').contains('*').click();
      cy.get('.button').contains('3').click();
      cy.get('.button').contains('=').click();
  
      cy.get('#display').should('have.value', '18');
  
      cy.get('.button').contains('8').click();
      cy.get('.button').contains('/').click();
      cy.get('.button').contains('2').click();
      cy.get('.button').contains('=').click();
  
      cy.get('#display').should('have.value', '4');
    });
  
    it('test clear', () => {
      cy.get('.button').contains('5').click();
      cy.get('.button').contains('C').click();
      cy.get('#display').should('have.value', '');
    });
  
    it('test err', () => {
      cy.get('.button').contains('5').click();
      cy.get('.button').contains('/').click();
      cy.get('.button').contains('0').click();
      cy.get('.button').contains('=').click();
  
      cy.get('#display').should('have.value', 'Ошибка');
    });
  
    it('testing decimal numbers', () => {
      cy.get('.button').contains('5').click();
      cy.get('.button').contains('.').click();
      cy.get('.button').contains('5').click();
      cy.get('.button').contains('+').click();
      cy.get('.button').contains('2').click();
      cy.get('.button').contains('.').click();
      cy.get('.button').contains('5').click();
      cy.get('.button').contains('=').click();
  
      cy.get('#display').should('have.value', '8');
    });
  
  });
  
  