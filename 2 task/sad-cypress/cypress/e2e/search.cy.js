describe('Staff Edit Modal', () => {
    beforeEach(() => {

      cy.visit('http://localhost:3000/');
      cy.window().then((win) => {

        win.localStorage.removeItem('items');
      }); 
    });
it('should allow filling out and submitting the form', () => {
    cy.get("button").contains("Добавить").click()
    cy.get("button").contains("Добавить").click()

    cy.get('.modal').should('be.visible');

    cy.get('input[placeholder="ФИО"]').type('Иван Иванов');
    cy.get('input[placeholder="Компания"]').type('Компания ООО');
    

    cy.get('.select').click();
    cy.contains('Клиент').click();

    cy.get('.modal__form-checkbox input').check();

    cy.get("button").contains("Сохранить").click()

    cy.window().then((win) => {
      const items = JSON.parse(win.localStorage.getItem('items'));
      expect(items).to.have.lengthOf(1);
      expect(items[0]).to.deep.include({
        name: 'Иван Иванов',
        company: 'Компания ООО',
        group: 'Клиент',
        qauntity: true
      });
    });

    cy.get('input[placeholder="ФИО"]').should('have.value', '');
    cy.get('input[placeholder="Компания"]').should('have.value', '');
    cy.get('.select').should('have.text', 'Выбрать');
    cy.get('.modal__form-checkbox input').should('not.be.checked');

    cy.get('input[placeholder="ФИО"]').type('Shops roma');
    cy.get('input[placeholder="Компания"]').type('!geniy');
    cy.get('.select').click();
    cy.contains('Партнер').click();
    cy.get('.modal__form-checkbox input').check();
    cy.get("button").contains("Сохранить").click()

    cy.window().then((win) => {
        const items = JSON.parse(win.localStorage.getItem('items'));
        expect(items).to.have.lengthOf(2);
        expect(items[1]).to.deep.include({
          name: 'Shops roma',
          company: '!geniy',
          group: 'Партнер',
          qauntity: true
        });
      });

    cy.get('.btn__close-button').click();
    cy.get('input[placeholder="Поиск по имени"]').type('Иван Иванов');
    cy.get('input[placeholder="Поиск по компании"]').type('Компания ООО');
  });
});