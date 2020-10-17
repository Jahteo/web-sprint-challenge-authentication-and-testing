const request = require("supertest");
const db = require("../database/dbConfig");
const makeServer = require("../api/server-test");

const authRouter = require("./auth-router");

const server = makeServer(authRouter);

const testee = {
  "username": "RealBoy18",
  "password": "Pinocchio"
}
const failureTestee = {
  "username": "FakeBoy",
}

describe("auth-router.js", () => {
  //before each inside describe, so it doesn't run before every test in every file. Limiting scope this way.
  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
  });

  describe("register route", () => {
    it("should return a status 201 & the username on successful login", async () => {
      const response = await request(server).post("/register").send(testee)
      // console.log(response.body)
      expect(response.status).toEqual(201)
      expect(response.body.username).toEqual(testee.username)
    })

    it("should return status 400 when given invalid registration", async () => {
      const response = await request(server).post("/register").send(failureTestee)
      expect(response.status).toEqual(400)
    })
  })

  describe("login endpoint", () => {
    beforeEach(async () => {
      await request(server).post("/register").send(testee)
    })

    it("should return status 200 on a successful login", async () => {
      const response = await request(server).post("/login").send(testee)
      expect(response.status).toEqual(200)
    })

    it("should return status 400 when given invalid login", async () => {
      const response = await request(server).post("/login").send(failureTestee)
      expect(response.status).toEqual(400)
    })
  })
})