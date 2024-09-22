import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../settings/database.js";

const Service = sequelize.define('services', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export {Service}