const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('bd_farmacia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;
