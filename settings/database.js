import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ecommerce','user', 'password', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: './ecommerce.sqlite',
  logging: false
});

export {sequelize};