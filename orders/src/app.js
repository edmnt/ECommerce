import express from "express";
import bodyParser from "body-parser";
import { createOrderRouter } from "./routes/createOrder.js";
import { showOrdersRouter } from "./routes/showOrders.js";

const app = express();

app.use(bodyParser.json());
app.use(createOrderRouter);
app.use(showOrdersRouter);

export {app}