const {createExpenses, getAllExpenses, getAllExpensesByUser, updateAmount, updateDescription, deleteExpensesByDescription, calculateTotalExpenses, calculateExpensesByDescription, } = require('../controller/expenseController');
const expensesRouter = require('express').Router();

expensesRouter.get('/user-expenses', getAllExpenses);
expensesRouter.get('/user-expenses/:id', getAllExpensesByUser);
expensesRouter.post('/user-expenses/:id', createExpenses);
expensesRouter.post('/user-expenses-total/:id', calculateTotalExpenses);
expensesRouter.post('/user-expenses-description/:id', calculateExpensesByDescription);
expensesRouter.put('/user-expenses-amount/:id', updateAmount);
expensesRouter.put('/user-expenses-description/:id', updateDescription);
expensesRouter.delete('/user-expenses-description/:id', deleteExpensesByDescription);


module.exports = expensesRouter;