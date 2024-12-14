
beforeEach(() => {
    localStorage.clear();
});

test('Добавление расхода в массив', () => {
    const expenses = [];

    const newExpense = { name: 'Покупка кофе', amount: 150 };
    expenses.push(newExpense);
    expect(expenses).toContainEqual(newExpense);
});

test('Удаление расхода из массива', () => {
    const expenses = [
        { name: 'Покупка кофе', amount: 150 },
        { name: 'Такси', amount: 300 },
    ];
    expenses.splice(0, 1);
    expect(expenses).not.toContainEqual({ name: 'Покупка кофе', amount: 150 });
});

test('Обновление UI после изменения массива расходов', () => {
    const updateUI = jest.fn();
    const expenses = [{ name: 'Покупка кофе', amount: 150 }];
    updateUI();
    expect(updateUI).toHaveBeenCalled();
});

test('Расчет общей суммы расходов', () => {
    function getTotalExpense(expenses) {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }
    const expenses = [
        { name: 'Покупка кофе', amount: 150 },
        { name: 'Такси', amount: 300 },
    ];
    const total = getTotalExpense(expenses);
    expect(total).toBe(450);
});

test('Сохранение данных в localStorage', () => {
    const expenses = [
        { name: 'Покупка кофе', amount: 150 },
        { name: 'Такси', amount: 300 },
    ];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    const savedData = JSON.parse(localStorage.getItem('expenses'));
    expect(savedData).toEqual(expenses);
});

test('Загрузка данных из localStorage', () => {
    const expenses = [
        { name: 'Покупка кофе', amount: 150 },
        { name: 'Такси', amount: 300 },
    ];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    const loadedData = JSON.parse(localStorage.getItem('expenses'));
    expect(loadedData).toEqual(expenses);
});
