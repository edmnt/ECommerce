import { app } from "../../app.js";
import request from "supertest";

it("fails when a email doesn't exist is supplied", async ()=>{
  await request(app)
    .post("/api/users/signin")
    .send({
      "email": "edanurmente@gmail.com",
      "password": "123456"
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async ()=>{
  await request(app)
    .post("/api/users/signup")
    .send({
      "name": "eda",
      "surname": "mente",
      "email": "edanurrmente@gmail.com",
      "password": "123456"
    })
    .expect(201);

    await request(app)
    .post("/api/users/signin")
    .send({
      "email": "edanurrmente@gmail.com",
      "password": "askjdfsk"
    })
    .expect(400);
  });

  it("fails when a email or password is empty", async ()=>{
    await request(app)
      .post("/api/users/signin")
      .send({
        "email": "",
        "password": "123456"
      }).
      expect(400);

      await request(app)
      .post("/api/users/signin")
      .send({
        "email": "edanurrmente@gmail.com",
        "password": ""
      }).
      expect(400)
  });

it("return 200 after successful signin", async ()=>{
  await request(app)
    .post("/api/users/signup")
    .send({
      "name": "eda",
      "surname": "mente",
      "email": "edanurrmente@gmail.com",
      "password": "123456"
    })
    .expect(201);

    await request(app)
    .post("/api/users/signin")
    .send({
      "email": "edanurrmente@gmail.com",
      "password": "123456"
    })
    .expect(200);
});