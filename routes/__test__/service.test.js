import { app } from "../../app.js";
import request from "supertest";

it("Return 200 if services are listed succesfully.", async()=>{
  const testToken = await global.signin();

  const response = await request(app)
  .get("/api/v1/services")
  .set("Authorization", testToken)
  .expect(200);
});

it("Return 401 if token is expired.", async()=>{
  const testToken = await global.signin();
  const wrongToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlZGEyMDk1IiwiZW1haWwiOiJlZGFudXJtZW50ZUB0ZXN0LmNvbSIsImlkIjoxLCJpYXQiOjE3MjcwMjI5NDcsImV4cCI6MTcyNzAyNjU0N30.uhBqctv3HFeaPckC2IoC9b5JXTegb1_-7TEnconc6T4"
  const service = await global.service();

  await request(app)
  .get("/api/v1/services")
  .set("Authorization", wrongToken)
  .expect(401); 
});

it("Return 401 if there is no user has the token.", async()=>{
  // const testToken = await global.signin();
  const wrongToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlZGExMjMiLCJlbWFpbCI6ImVkYW51ckB0ZXN0LmNvbSIsImlkIjoyLCJpYXQiOjE3MjcwMzExMTMsImV4cCI6MTcyNzAzNDcxM30.FIBVN_SWqqOc-o3uiU8924sBi-5w8zKqBxuK2Wk4DsM"
  const service = await global.service();

  await request(app)
  .get("/api/v1/orders")
  .set("Authorization", wrongToken)
  .expect(401); 
});

