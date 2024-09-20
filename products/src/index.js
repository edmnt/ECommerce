import * as dotenv from "dotenv";
import { sequelize } from "../../utils/database.js";
import { app } from "./app.js";

dotenv.config();

const _CFG = Object.freeze({PORT: process.env.PORT});

const start = async () => {
  try {
    await sequelize.sync();  // Tabloları oluşturur
    console.log("Database synchronized." );
  } catch (err) {
    console.error("Error occured while connecting to database:", err);
  }
};

app.listen(_CFG.PORT, ()=>{
  console.log("Server is listening the port.");
});

start();