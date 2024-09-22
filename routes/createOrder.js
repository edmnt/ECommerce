import express from "express";
import { Order } from "../models/order.js";
import { authController } from "../middlewares/authController.js";
import { User } from "../models/user.js";
import { Service } from "../models/service.js";

const router = express.Router();

router.post("/api/v1/order/:serviceId", authController, async (req,res) =>{
  try {
    const {amount} = req.body;

    const orderingUser = await User.findOne({where: {id: req.user.id}});
    const orderingService = await Service.findOne({where: {id: req.params.serviceId}});
    if(!orderingUser){
      return res.status(401).send({ message: 'You are not authorized to make an order. Please signin and try again.' });
    }
    if(!orderingService){
      return res.status(200).send({message: "The service that you want to purchase is not available. Pleas choose another service."});
    }
    const orderPrice = await (orderingService.price)*amount;
    const remainingBalance = await (orderingUser.balance) - orderPrice;

    if(remainingBalance < 0){
      return res.status(400).send({message: "Insufficient balance. Please control your balance and try again."});
    }
    orderingUser.balance = remainingBalance;
    await orderingUser.save();

    const order = await Order.create({amount, serviceId: orderingService.id, userId: orderingUser.id, price:orderPrice})

    res.status(201).send({order})

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server issued an error");
  }
})

export {router as createOrderRouter}