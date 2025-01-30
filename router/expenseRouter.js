const {createExpenses, getAllExpenses, getAllExpensesByUser, updateAmount, updateCategory, deleteExpensesByCategory, calculateTotalExpenses, } = require('../controller/expenseController');
const expensesRouter = require('express').Router();

expensesRouter.get('/user-expenses', getAllExpenses);
expensesRouter.get('/user-expenses/:id', getAllExpensesByUser);
expensesRouter.post('/user-expenses/:id', createExpenses);
expensesRouter.post('/user-expenses-total/:id', calculateTotalExpenses);
expensesRouter.put('/user-expenses-amount/:id', updateAmount);
expensesRouter.put('/user-expenses-category/:id', updateCategory);
expensesRouter.delete('/user-expenses-category/:id', deleteExpensesByCategory);


module.exports = expensesRouter;