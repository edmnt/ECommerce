import express from "express";
import bodyParser from "body-parser";
import { createOrderRouter } from "./routes/createOrder.js";

const app = express();

app.use(bodyParser.json());
app.use(createOrderRouter);

export {app}