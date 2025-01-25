
describe("Expense Tracker App", () => {
    beforeEach(() => {
      cy.visit("expense-tracker.html");
    });
  
    function addExpense(name, amount) {
      cy.get('#expense-name').type(name);
      cy.get('#expense-amount').type(amount);
      cy.get('button[type="submit"]').click();
    }
  
    function checkExpenseInList(name, amount) {
      cy.get('#expense-list')
        .should('contain.text', name)
        .and('contain.text', amount);
    }
  
    it("should add a new expense", () => {
      addExpense('Кофе', '300');
      checkExpenseInList('Кофе', '300');
      cy.get('#total-expense').should('contain.text', '300');
    });
  
    it("should error for name", () => {
      cy.get('#expense-amount').type('300');
      cy.get('button[type="submit"]').click();
      cy.get('.error-message')
        .should('be.visible')
        .and('contain.text', 'Название расхода обязательно');
    });
  
    it("should error for amount", () => {
      cy.get('#expense-name').type('Кофе');
      cy.get('button[type="submit"]').click();
      cy.get('.error-message')
        .should('be.visible')
        .and('contain.text', 'Сумма обязательна');
    });
  
    it("should update total correctly", () => {
      addExpense('Кофе', '300');
      addExpense('Обед', '500');
      cy.get('#total-expense').should('contain.text', '800');
    });
  
    it("should remove an expense", () => {
      addExpense('Кофе', '300');
      cy.get('#expense-list li').first().find('.remove-button').click();
      cy.get('#expense-list').should('not.contain.text', 'Кофе');
      cy.get('#total-expense').should('contain.text', '0');
    });
  
    it("should edit expense", () => {
      addExpense('Кофе', '300');
      cy.get('#expense-list li').first().find('.edit-button').click();
      cy.get('#expense-name').clear().type('Чай');
      cy.get('#expense-amount').clear().type('200');
      cy.get('button[type="submit"]').click();
      checkExpenseInList('Чай', '200');
      cy.get('#total-expense').should('contain.text', '200');
    });
  });