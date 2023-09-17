"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("postgres://postgres:1234@localhost:5432/imtixon");
exports.sequelize = sequelize;
const connect = () => {
    try {
        sequelize.authenticate().then(() => {
            console.log("Postgres connection has been established successfully.");
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
exports.connect = connect;
