describe('validate Form', () => {
    beforeEach(() => {

      cy.visit('http://localhost:3000/'); 
      cy.window().then((win) => {

        win.localStorage.removeItem('items');
      });
    });
  
    it('should validate required fields and show error messages', () => {
      cy.get("button").contains("Добавить").click()
      cy.get("button").contains("Добавить").click()

      cy.get('.modal').should('be.visible');
  
      cy.get("button").contains("Сохранить").click()
  
      cy.get('span').contains('Поле не должно быть пустым').should('have.length', 1);
    });
    it('should validate required fields and show error messages', () => {
        cy.get("button").contains("Добавить").click()
        cy.get("button").contains("Добавить").click()
        cy.get('.modal').should('be.visible');
        cy.get('input[placeholder="ФИО"]').type('Иван Иванов');

        cy.get("button").contains("Сохранить").click()
    

        cy.get('span').contains('Поле не должно быть пустым').should('have.length', 1);
      });
      it('should validate required fields and show error messages', () => {
        cy.get("button").contains("Добавить").click()
        cy.get("button").contains("Добавить").click()

        cy.get('.modal').should('be.visible');
        cy.get('input[placeholder="ФИО"]').type('Иван Иванов');
        cy.get('input[placeholder="Компания"]').type('Компания ООО');

        cy.get("button").contains("Сохранить").click()
    
        cy.get('span').contains('Поле не должно быть пустым').should('have.length', 1);
      });
      it('should validate required fields and show error messages', () => {
        cy.get("button").contains("Добавить").click()
        cy.get("button").contains("Добавить").click()

        cy.get('.modal').should('be.visible');
        cy.get('input[placeholder="ФИО"]').type('Иван Иванов');
        cy.get('input[placeholder="Компания"]').type('Компания ООО');
        cy.get('.select').click();
        cy.contains('Клиент').click();
        cy.get("button").contains("Сохранить").click()
        cy.get('.btn__close-button').click();
      });
});