const expensesModel = require('../models/expense')
const userModel = require('../models/user');
const { Op } = require('sequelize');


exports.createExpenses = async (req, res) => {
  try {
    const date = new Date();
    const newDate = date.toLocaleDateString();
    const newId = Math.floor(Math.random() * 100000);

    const { id } = req.params;
    const { category, amount } = req.body;
    const existingUser = await userModel.findOne({ where: { id: id } });

    if (!existingUser) {
      return res.status(400).json('Cannot create expenses for unexisting user');
    }

    const data = {
      id: newId,
      userId: existingUser.id,
      category,
      amount,
      startDate: newDate,
      endDate: newDate
    };

    const newExpense = await expensesModel.create(data);
    res.status(201).json({
      message: `Expenses created for ${existingUser.firstName} ${existingUser.lastName} successfully`,
      data: newExpense
    });

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await expensesModel.findAll();
    res.status(200).json({
      message: 'Expenses by all users',
      data: allExpenses
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getAllExpensesByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkEmail = await userModel.findOne({ where: { id: id } });

    if (!checkEmail) {
      return res.status(400).json('User does not exist');
    }

    const userExpenses = await expensesModel.findAll({ where: { userId: checkEmail.dataValues.id } });
    res.status(200).json({
      message: 'Expenses by this user',
      data: userExpenses
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, category } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }
    const update = { startDate, category };
    const userCategory = await expensesModel.findOne({ where: { userId: checkUser.dataValues.id } });
    const updateCategory = await expensesModel.update(update, { where: { category: userCategory.category } });
    res.status(200).json(`Expenses made 0n ${startDate} has been updated to ${category}`);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


exports.updateAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, amount } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }
    const update = { startDate, amount };
    const userCategory = await expensesModel.findOne({ where: { userId: checkUser.dataValues.id } });
    const updateCategory = await expensesModel.update(update, { where: { category: userCategory.category } });
    res.status(200).json(`Cost of expenses made 0n ${startDate} has been updated to ${amount}`);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


exports.deleteExpensesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }

    const userCategory = await expensesModel.findOne({ where: { userId: checkUser.dataValues.id } });
    const deleteCategory = await expensesModel.destroy({ where: { category: userCategory.category } });
    res.status(200).json(`${category} has been deleted successfully`);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.calculateTotalExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    const checkEmail = await userModel.findOne({ where: { id: id } });

    if (!checkEmail) {
      return res.status(400).json('User does not exist');
    }

    const expenses = await expensesModel.findAll({
      where: {
        userId: checkEmail.dataValues.id,
        startDate: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    res.status(200).json({
      message: `Total expenses from ${startDate} to ${endDate}`,
      totalAmount: totalAmount
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

