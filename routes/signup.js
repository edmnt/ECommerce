import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/api/v1/signup", async (req, res)=>{
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
    
    return res.status(201).send({user});

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server issued an error");
  }

});

export {router as signupRouter}