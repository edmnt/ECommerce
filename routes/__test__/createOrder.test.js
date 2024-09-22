import { app } from "../../app.js";
import request from "supertest";

it("Return 201 if order got created.", async()=>{
  const testToken = await global.signin();

  const service = await global.service();

  const response = await request(app)
  .post(`/api/v1/order/${service.id}`)
  .set("Authorization", testToken)
  .send({
    amount: 2
  })
  .expect(201); 

});

it("Return 400 if there is no service that can purchased.", async()=>{
  const testToken = await global.signin();

  const response = await request(app)
  .post("/api/v1/order/2")
  .set("Authorization", testToken)
  .send({
    amount: 2
  })
  .expect(400); 

});

it("Return 401 if token is expired.", async()=>{
  const testToken = await global.signin();
  const wrongToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlZGEyMDk1IiwiZW1haWwiOiJlZGFudXJtZW50ZUB0ZXN0LmNvbSIsImlkIjoxLCJpYXQiOjE3MjcwMjI5NDcsImV4cCI6MTcyNzAyNjU0N30.uhBqctv3HFeaPckC2IoC9b5JXTegb1_-7TEnconc6T4"
  const service = await global.service();

  const response = await request(app)
  .post(`/api/v1/order/${service.id}`)
  .set("Authorization", wrongToken)
  .send({
    amount: 2
  })
  .expect(401); 
});

it("Return 401 if there is no user has the token.", async()=>{
  // const testToken = await global.signin();
  const wrongToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlZGExMjMiLCJlbWFpbCI6ImVkYW51ckB0ZXN0LmNvbSIsImlkIjoyLCJpYXQiOjE3MjcwMzExMTMsImV4cCI6MTcyNzAzNDcxM30.FIBVN_SWqqOc-o3uiU8924sBi-5w8zKqBxuK2Wk4DsM"
  const service = await global.service();

  const response = await request(app)
  .post(`/api/v1/order/${service.id}`)
  .set("Authorization", wrongToken)
  .send({
    amount: 2
  })
  .expect(401); 
});

it("Return if user's balance insufficient.", async()=>{
  const testToken = await global.signin();
  const service = await global.service();

  const response = await request(app)
  .post(`/api/v1/order/${service.id}`)
  .set("Authorization", testToken)
  .send({
    amount: 4
  })
  .expect(400); 
  console.log("Response Body", response.body);
});