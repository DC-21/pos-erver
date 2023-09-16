const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Business', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgresql',
  logging: true,
});
module.exports=sequelize;