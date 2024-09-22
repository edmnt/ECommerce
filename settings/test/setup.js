import { sequelize } from "../database.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";
import { Service } from "../../models/service.js";

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

  const testToken = jwt.sign({iss: process.env.JWT_ISSUER, email: testUser.email, id: testUser.id}, process.env.JWT_KEY, {expiresIn: '1h'});

  return `Bearer ${testToken}`;
};

global.service = async ()=>{
  try {
    const service = await Service.create({name:"Standard Shipping", description: "Basic shipping service with average delivery time." , price: 40.00})
    return service;
  } catch (error) {
    console.log(error);
  }
}