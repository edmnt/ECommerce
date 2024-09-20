import express from "express";
import {Product} from "../models/product.js"


const router = express.Router();

router.post("/api/v1/product", async (req,res)=>{
try {
  const {title, price, description} = req.body;
  await Product.create({title,price,description});
  const newProduct = {title,price, description}
    
  return res.status(201).send(newProduct);
} catch (error) {
  console.log(error);
  return res.status(500).send("Server issued an error");
}
});

export {router as createProductRouter}