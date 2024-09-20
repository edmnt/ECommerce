import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import * as dotenv from "dotenv";
import { Token } from "../models/user.js";

dotenv.config();

const __CFG = Object.freeze({JWT_KEY: process.env.JWT_KEY, JWT_ISSUER: process.env.JWT_ISSUER});


const router = express.Router();

router.post("/api/users/signin", async (req, res)=>{
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).send({message: "Invalid or mistaken email address or password."});
    }

    const existingUser = await User.findOne({where: {email}});
    if(!existingUser || !email){
      return res.status(400).send({message: "Invalid or mistaken email address."});
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if(!passwordMatch || !password){
      return res.status(400).send({message: "Invalid or mistaken password."});
    }

    const userJwt = jwt.sign(
      {
        iss: __CFG.JWT_ISSUER,
        email,
        id: existingUser.id
      }, 
      __CFG.JWT_KEY,
      { expiresIn: '1h' }
   );

    await Token.create({token: userJwt, user: existingUser});

    return res.status(201).send({token: userJwt});

  } catch (error) {
    console.log(error);
    res.status(500).send("Server issued an error");
    return;
  }

});

export {router as signinRouter}