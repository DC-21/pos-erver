const Sequelize = require('sequelize');
const db = require('../Utils/db');

const User = db.define('User', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },
    full_name:{
        type:Sequelize.STRING,
        allowNull: false,
        required:true,
        unique:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
        required:true,
        unique:true,
    },
    phone_number:{
        type:Sequelize.INTEGER,
        allowNull: false,
        required:true,
        unique:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = User;