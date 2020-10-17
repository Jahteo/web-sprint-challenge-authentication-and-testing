const request = require("supertest");
const server = require("./server");

describe('index route', () => {
  it('should return an OK status code from the status route', async () => {
    const expectedStatusCode = 200;
    const response = await request(server).get('/status');
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual({ api: true, db: true })
  });
});
