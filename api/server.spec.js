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

describe("auth-router.js", () => {
  describe("register route", () => {
    it.skip("should return a {message: 'login post success'} on successful login", async () => {
      //beforeEach reset is broken, so be sure to make a new username in testee when you want this to run
      const testee = {
        "username": "RealBoy6", "password": "Pinocchio"
      }
      const response = await request(server).post("/api/auth/register").send(testee)
      console.log(response.body)
      expect(response.status).toEqual(201)
      expect(response.body.username).toEqual(testee.username)
    })
  })
})