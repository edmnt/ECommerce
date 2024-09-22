import express from "express";
import bodyParser from "body-parser";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { createOrderRouter } from "./routes/createOrder.js";
import { showOrdersRouter } from "./routes/showOrders.js";
import { showServicesRouter } from "./routes/showServices.js";


const app = express();

app.use(bodyParser.json());
app.use(createOrderRouter);
app.use(showOrdersRouter);

app.use(showServicesRouter);

app.use(bodyParser.json());
app.use(signupRouter);
app.use(signinRouter);

export {app}