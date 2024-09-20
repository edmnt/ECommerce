import express from "express";
import { Order } from "../models/order.js";
import { authController } from "../middlewares/authController.js";

const router = express.Router();

router.post("/api/v1/order", authController, async (req,res) =>{
  try {
    

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server issued an error");
  }
})

export {router as createOrderRouter}