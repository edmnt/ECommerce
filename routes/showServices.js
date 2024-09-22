import { authController } from "../middlewares/authController.js";
import { User } from "../models/user.js";
import express from "express";
import { Service } from "../models/service.js";

const router = express.Router();

router.get("/api/v1/services", authController, async(req,res)=>{
  try {
    const existingUser = await User.findOne({where: {id: req.user.id}});
    if(!existingUser){
      return res.status(401).send({ message: 'You are not authorized to make an order. Please signin.' });
    }
    const services = await Service.findAll({});
    if(!services){
      return res.status(400).send({message: "There is no service."})
    }
    res.status(200).send({services})

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server issued an error");
  }
})

export {router as showServicesRouter}
