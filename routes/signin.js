import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { Token } from "../models/user.js";
import { _CFG } from "../app.js";

const router = express.Router();

router.post("/api/v1/signin", async (req, res)=>{
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
        iss: _CFG.JWT_ISSUER,
        email,
        id: existingUser.id
      }, 
      _CFG.JWT_KEY,
      { expiresIn: '1h' }
   );

    await Token.create({token: userJwt, user: existingUser});

    return res.status(200)
    .header('Authorization', `Bearer ${userJwt}`)
    .send({token: userJwt});

  } catch (error) {
    console.log(error);
    res.status(500).send("Server issued an error");
    return;
  }

});

export {router as signinRouter}