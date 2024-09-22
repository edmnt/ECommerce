import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../settings/database.js";

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  } ,
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  } ,
  email: {
    type: Sequelize.STRING,
    allowNull: false
  } ,
  password: {
    type: Sequelize.STRING,
    allowNull: false
  } ,
  balance: {
    type: Sequelize.BIGINT
  }
});

const Token = sequelize.define('tokens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  token: {
    type: Sequelize.STRING,
  },
  user:{
    type: DataTypes.JSON
  }
});

export {User, Token}