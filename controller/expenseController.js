const expensesModel = require('../models/expense')
const userModel = require('../models/user');
const { Op } = require('sequelize');


exports.createExpenses = async (req, res) => {
  try {
    const date = new Date();
    const newDate = date.toLocaleDateString();
    const newId = Math.floor(Math.random() * 100000);

    const { id } = req.params;
    const { description, amount } = req.body;
    const existingUser = await userModel.findOne({ where: { id: id } });

    if (!existingUser) {
      return res.status(400).json('Cannot create expenses for unexisting user');
    }

    const data = {
      id: newId,
      userId: existingUser.id,
      description,
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


exports.updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, description } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }
    const update = { startDate, description };
    const userDescription = await expensesModel.findOne({ where: { userId: checkUser.dataValues.id } });
    const updateDescription = await expensesModel.update(update, { where: { description: userDescription.description } });
    res.status(200).json(`Expenses made 0n ${startDate} has been updated to ${description}`);
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
    const userDescription = await expensesModel.findOne({ where: { userId: checkUser.dataValues.id } });
    const updateDescription = await expensesModel.update(update, { where: { description: userDescription.description } });
    res.status(200).json(`Cost of expenses made 0n ${startDate} has been updated to ${amount}`);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


exports.deleteExpensesByDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }

    const userDescription = await expensesModel.findOne({ where: { userId: checkUser.dataValues.id } });
    const deleteDescription = await expensesModel.destroy({ where: { description: userDescription.description } });
    res.status(200).json(`${description} has been deleted successfully`);
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
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }

    const expenses = await expensesModel.findAll({
      where: {
        userId: checkUser.dataValues.id,
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


exports.calculateExpensesByDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, startDate, endDate } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(400).json('User does not exist');
    }
        
    const expenses = await expensesModel.findAll({
      where: {
        userId: checkUser.dataValues.id,
        description: description,
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

