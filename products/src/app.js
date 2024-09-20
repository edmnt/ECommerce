import express from "express";
import bodyParser from "body-parser";
import { createProductRouter } from "./routes/createProduct.js";

const app = express();

app.use(bodyParser.json());
app.use(createProductRouter);

export {app}