import { app } from "../../app.js";
import request from "supertest";

it("returns a 201 on succesful signup", async ()=> {
  return await request(app)
    .post("/api/v1/signup")
    .send({
      "name": "eda",
      "surname": "mente",
      "email": "edamentee@gmail.com",
      "password": "123456"
    }).expect(201);
});

it("returns a 400 when trying to sign up with existing email.", async ()=> {
  await request(app)
    .post("/api/v1/signup")
    .send({
      "name": "eda",
      "surname": "mente",
      "email": "edaamente@gmail.com",
      "password": "123456"
    })
    .expect(201);

    await request(app)
    .post("/api/v1/signup")
    .send({
      "name": "eda",
      "surname": "mente",
      "email": "edaamente@gmail.com",
      "password": "1234567"
    })
    .expect(400);
});

it("returns a 400 when getting password less then 6 characters.", async ()=> {
  return await request(app)
    .post("/api/v1/signup")
    .send({
      "name": "eda",
      "surname": "mente",
      "email": "edamentee@gmail.com",
      "password": "12356"
    }).expect(400);
});

it("it returns a 500 with missing email and password", async ()=> {
  return await request(app)
    .post("/api/v1/signup")
    .send({
      
    })
    .expect(400);
});