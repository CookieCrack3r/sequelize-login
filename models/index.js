"use strict";

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: __dirname + "/../database.sqlite"
});

let User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = {
    sequelize:  sequelize,
    User:       User
}