import { Service } from "../models/service.js";

async function creatingServices(servicesJson){
  const services = servicesJson.services;
  try {
    // Controlling database to prevent duplicate data
    const isEmpty = await Service.count();

    if(isEmpty!==0){
      return console.log("Services are already created.");
    }else{
      for await (let service of services){
        const newService = await Service.create({name: service.name, price: service.price, description: service.description});
        // console.log(newService);
      }
      return;
    }

  } catch (err) {
    console.error("Error occured while connecting to database:", err);
  }
}
export {creatingServices};