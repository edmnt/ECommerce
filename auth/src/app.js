import express from "express";
import bodyParser from "body-parser";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";

const app = express();

app.use(bodyParser.json());
app.use(signupRouter);
app.use(signinRouter);

export {app}