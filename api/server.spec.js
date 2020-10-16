const request = require("supertest");
const server = require("./server");
// const auth = require("./server");
describe('index route', () => {
  it('should return an OK status code from the index route', async () => {
    const expectedStatusCode = 200;
    const response = await request(server).get('/');
    expect(response.status).toEqual(expectedStatusCode);
  });
});

// beforeEach(async () => {
//   // this function executes and clears out the table before each test
//   await db('test').truncate();
// });
//beforeEach reset is broken, so be sure to make a new username in testee when you want this to run
const testee = {
  "username": "RealBoy17", "password": "Pinocchio"
}
const failureTestee = {
  "username": "FakeBoy",
}

describe("auth-router.js", () => {
  describe("register route", () => {
    it("should return a status 201 & the username on successful login", async () => {
      const response = await request(server).post("/api/auth/register").send(testee)
      // console.log(response.body)
      expect(response.status).toEqual(201)
      expect(response.body.username).toEqual(testee.username)
    })
    it("should return status 400 when given invalid registration", async () => {
      const response = await request(server).post("/api/auth/register").send(failureTestee)
      expect(response.status).toEqual(400)
    })
  })

  describe("login endpoint", () => {
    it("should return status 200 on a successful login", async () => {
      const response = await request(server).post("/api/auth/login").send(testee)
      expect(response.status).toEqual(200)
    })
    it("should return status 400 when given invalid login", async () => {
      const response = await request(server).post("/api/auth/login").send(failureTestee)
      expect(response.status).toEqual(400)
    })
  })

  describe("jokes endpoint", () => {
    it.skip("should return status 200 on a successful get", async () => {
      const token = req.headers.authorization
      const response = await request(server).post("/api/jokes").send(token)
      console.log(response)
      expect(response.status).toEqual(200)
    })
    it("should return status 400 when given invalid token", async () => {
      const response = await request(server).post("/api/jokes").send(failureTestee)
      expect(response.status).toEqual(401)
    })
  })
})