
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Приложение для отслеживания расходов', function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('expense-tracker.html');
  });

  afterEach(async function() {
    await driver.quit();
  });

  async function addExpense(name, amount) {
    await driver.findElement(By.id('expense-name')).sendKeys(name);
    await driver.findElement(By.id('expense-amount')).sendKeys(amount);
    await driver.findElement(By.css('button[type="submit"]')).click();
  }

  async function checkExpenseInList(name, amount) {
    const expenseList = await driver.findElements(By.css('#expense-list li'));
    let found = false;
    for (let expense of expenseList) {
      const text = await expense.getText();
      if (text.includes(name) && text.includes(amount)) {
        found = true;
        break;
      }
    }
    assert.strictEqual(found, true);
  }

  it('должен добавить новый расход', async function() {
    await addExpense('Кофе', '300');
    await checkExpenseInList('Кофе', '300');
    const totalExpense = await driver.findElement(By.id('total-expense')).getText();
    assert(totalExpense.includes('300'));
  });

  it('должна быть ошибка для названия', async function() {
    await driver.findElement(By.id('expense-amount')).sendKeys('300');
    await driver.findElement(By.css('button[type="submit"]')).click();
    const errorMessage = await driver.findElement(By.css('.error-message')).getText();
    assert(errorMessage.includes('Название расхода обязательно'));
  });

  it('должна быть ошибка для суммы', async function() {
    await driver.findElement(By.id('expense-name')).sendKeys('Кофе');
    await driver.findElement(By.css('button[type="submit"]')).click();
    const errorMessage = await driver.findElement(By.css('.error-message')).getText();
    assert(errorMessage.includes('Сумма обязательна'));
  });

  it('должен правильно обновляться общий итог', async function() {
    await addExpense('Кофе', '300');
    await addExpense('Обед', '500');
    const totalExpense = await driver.findElement(By.id('total-expense')).getText();
    assert(totalExpense.includes('800'));
  });

  it('должен удалять расход', async function() {
    await addExpense('Кофе', '300');
    await driver.findElement(By.css('#expense-list li .remove-button')).click();
    const expenseList = await driver.findElements(By.css('#expense-list li'));
    let found = false;
    for (let expense of expenseList) {
      const text = await expense.getText();
      if (text.includes('Кофе')) {
        found = true;
        break;
      }
    }
    assert.strictEqual(found, false);

    const totalExpense = await driver.findElement(By.id('total-expense')).getText();
    assert(totalExpense.includes('0'));
  });

  it('должен редактировать расход', async function() {
    await addExpense('Кофе', '300');
    await driver.findElement(By.css('#expense-list li .edit-button')).click();
    await driver.findElement(By.id('expense-name')).clear();
    await driver.findElement(By.id('expense-name')).sendKeys('Чай');
    await driver.findElement(By.id('expense-amount')).clear();
    await driver.findElement(By.id('expense-amount')).sendKeys('200');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await checkExpenseInList('Чай', '200');
    const totalExpense = await driver.findElement(By.id('total-expense')).getText();
    assert(totalExpense.includes('200'));
  });
});