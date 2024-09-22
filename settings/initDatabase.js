import { sequelize } from "./database.js"
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { Service } from "../models/service.js";


const startDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized." );
  } catch (err) {
    console.error("Error occured while connecting to database:", err);
  }
};

export {startDatabase}