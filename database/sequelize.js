const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('sql8759379', 'sql8759379', 'x4njfdipLh', {
  host: 'sql8.freesqldatabase.com',
  dialect: 'mysql'
});

module.exports = sequelize