import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../../utils/database.js";

const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  amount: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  serviceId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  price:{
    type: Sequelize.BIGINT,
    allowNull: false
  },
  userId:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

export {Order}