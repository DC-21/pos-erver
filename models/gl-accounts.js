const Sequelize = require("sequelize");
const db = require("../Utils/db");

const glaccount = db.define("Glaccount", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  code: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: false,
});

module.exports = glaccount;