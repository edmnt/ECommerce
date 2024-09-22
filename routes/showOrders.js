import { authController } from "../middlewares/authController.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import express from "express";

const router =express.Router();

router.get("/api/v1/orders", authController,async(req,res)=>{
  try {
    const orderingUser = await User.findOne({where: {id: req.user.id}});
    if(!orderingUser){
      return res.status(401).send({ message: 'You are not authorized to make an order. Please signin and try again.' });
    }
    const orders = await Order.findAll({where: {userId: orderingUser.id}});

    if(orders.length === 0){
      return res.status(200).send({message: "There is no order that purchased."})
    }

    res.status(200).send({orders})

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server issued an error");
  }
})

export {router as showOrdersRouter}
