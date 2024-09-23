import { sequelize } from "../database.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";
import { Service } from "../../models/service.js";
import { _CFG } from "../../app.js";
import { creatingServices } from "../../routes/createService.js";

beforeAll(async () => {
  process.env.JWT_KEY = "mente123";
  process.env.JWT_ISSUER = "eda123";

  await sequelize.sync();
});

beforeEach(async()=>{
  await sequelize.sync({ force: true })
});

afterAll(async () => {
  await sequelize.close();
});

global.signin = async () => {
  
  const testUser = await User.create({
    name: 'eda',
    surname: "mente",
    email: 'eda@test.com',
    password: '123456',
    balance: 100
  });

  const testToken = jwt.sign({iss: _CFG.JWT_ISSUER, email: testUser.email, id: testUser.id}, _CFG.JWT_KEY, {expiresIn: '1h'});

  return `Bearer ${testToken}`;
};

global.service = async ()=>{
  try {
    const services = {
      "services": [
        {
            "id": 1,
            "name": "Standard Shipping",
            "description": "Basic shipping service with average delivery time.",
            "price": 5.00
        },
        {
            "id": 2,
            "name": "Express Shipping",
            "description": "Faster delivery service with premium charges.",
            "price": 15.00
        },
        {
            "id": 3,
            "name": "Gift Wrapping",
            "description": "Special gift wrapping service for special occasions.",
            "price": 2.50
        },
        {
            "id": 4,
            "name": "Installation Service",
            "description": "Professional installation service for electronic devices.",
            "price": 30.00
        }
      ]
    }
    const isEmpty = await Service.count();
    if(isEmpty !== 0){
      return;
    }else{
      for await (let service of services.services){
        await Service.create({name: service.name, price: service.price, description: service.description});
      }
      const _services = await Service.findAll({});
      return _services;
    }
  } catch (error) {
    console.log(error);
  }
}