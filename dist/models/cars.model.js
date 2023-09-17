"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("../public/index");
class Car extends sequelize_1.Model {
}
exports.default = Car;
Car.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    marka: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tanirovka: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    motor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    distance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    gearbook: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: "Ideal xolatda",
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { sequelize: index_1.sequelize, tableName: "cars" });
Car.sync({ alter: true });
