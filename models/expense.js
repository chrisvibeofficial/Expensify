const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class expense extends Model {}

expense.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'expense', // We need to choose the model name
    tableName: 'expenses',
    timestamps: true
  },
);

module.exports = expense