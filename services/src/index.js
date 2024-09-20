import * as dotenv from "dotenv";
import { sequelize } from "../../utils/database.js";
import { readFile } from 'fs/promises';
import { creatingServices } from "./routes/createService.js";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();
const _CFG = Object.freeze({PORT: process.env.PORT});

const app = express();

app.use(bodyParser.json());
// Database is creating or synced.
const start = async () => {
  try {
    await sequelize.sync();  // Tabloları oluşturur
    console.log("Database synchronized." );
  } catch (err) {
    console.error("Error occured while connecting to database:", err);
  }
};
// Services.json data using for Service Table
const json = JSON.parse(
  await readFile(
    new URL('../../services.json', import.meta.url)
  )
);

app.listen(_CFG.PORT, ()=>{
  console.log("Server is listening the port.");
});
// awaiting database creation for app is not crashing.
await start();

creatingServices(json);