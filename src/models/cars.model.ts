import { Model, DataTypes } from "sequelize";
import { sequelize } from "../public/index";

export default class Car extends Model {}
Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    marka: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanirovka: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    motor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gearbook: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Ideal xolatda",
    },
    file: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, tableName: "cars" }
);

Car.sync({ alter: true });
