const request = require("supertest");
const makeServer = require("../api/server-test");

const jokesRouter = require("./jokes-router");

const server = makeServer(jokesRouter);

describe("jokes-router.js", () => {
  describe("jokes endpoint", () => {
    it("should return status 200 on a successful get", async () => {
      const response = await request(server).get("/")
      expect(response.status).toEqual(200)
    })
  })
})