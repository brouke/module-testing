document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalExpenseDisplay = document.getElementById('total-expense');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function updateUI() {
        expenseList.innerHTML = '';
        let totalExpense = 0;
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name}: <span>${expense.amount} руб.</span>`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', function () {
                deleteExpense(index);
            });

            li.appendChild(deleteButton);
            expenseList.appendChild(li);

            totalExpense += parseFloat(expense.amount);
        });
        totalExpenseDisplay.textContent = totalExpense.toFixed(2);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        updateUI(); 
    }

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value.trim());

        if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
            const newExpense = {
                name: expenseName,
                amount: expenseAmount
            };

            expenses.push(newExpense);
            updateUI();

            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        } else {
            alert('Пожалуйста, заполните все поля корректно!');
        }
    });

    updateUI();
});
