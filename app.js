import express from "express";
import bodyParser from "body-parser";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { createOrderRouter } from "./routes/createOrder.js";
import { showOrdersRouter } from "./routes/showOrders.js";
import { showServicesRouter } from "./routes/showServices.js";
import * as dotenv from "dotenv";

dotenv.config();

const _CFG = Object.freeze({
  PORT: process.env.PORT ?? 3000,
  SECRET_TOKEN: process.env.JWT_KEY ?? "mente123",
  JWT_ISSUER: process.env.JWT_ISSUER ?? "eda2095",
});


const app = express();

app.use(bodyParser.json());
app.use(createOrderRouter);
app.use(showOrdersRouter);

app.use(showServicesRouter);

app.use(bodyParser.json());
app.use(signupRouter);
app.use(signinRouter);

export {app, _CFG}