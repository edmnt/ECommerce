import express from "express";
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
// import * as dotenv from "dotenv";
// import { Token } from "../models/models.js";

// dotenv.config();

// const __CFG = Object.freeze({JWT_KEY: process.env.JWT_KEY, JWT_ISSUER: process.env.JWT_ISSUER});

const router = express.Router();

router.post("/api/users/signup", async (req, res)=>{
  try {
    const {name, surname, email, password} = req.body;
    const balance = 100;
    if(!email || !password || !name || !surname){
      return res.status(400).send({message: "Mistaken credentials."});
    }

    const existingUser = await User.findOne({where: {email}});

    if (existingUser) {
      return res.status(400).json({ message: 'This email has been taken.' });
    }
    if(password.length < 6 ){
      return res.status(400).json({ message: 'The password length must be greater than 6 characters.' });

    }

    let passwordHash = await bcrypt.hash(password,12);

    await User.create({
      name,
      surname,
      email,
      password:passwordHash,
      balance
    });

    const user = {
      name,
      surname,
      email,
      balance
    };
// console.log(process.env.JWT_ISSUER);
//     const userJwt = jwt.sign({
//       iss: __CFG.JWT_ISSUER,
//       email: user.email
//     }, __CFG.JWT_KEY);

//     const token =  await Token.create({token: userJwt,user});
    return res.status(201).send({user});

  } catch (error) {
    console.log(error);
    res.status(500).send("Server issued an error");
    return;
  }

});

export {router as signupRouter}