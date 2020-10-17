const request = require("supertest");
const makeServer = require("../api/server-test");

const authentication = require("./authenticate-middleware");

const router = require('express').Router();
router.get("/", authentication, (req, res) => {
  res.status(200).json({});
});

const server = makeServer(router);

describe('authenticate middleware', () => {
  it('should return an 200 status code on missing authentication', async () => {
    const response = await request(server).get('/').set("Authorization", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhIGR1ZGUyIiwiaWF0IjoxNjAyOTAyMDQyLCJleHAiOjE2MDI5MzA4NDJ9.xm-ZP_Ywi22XXECVjptZIKyYSKoZPu4BRv0EYJThJZ0');
    expect(response.status).toEqual(401);
  });

  it('should return an 401 status & message on missing authentication', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("missing authorization header")
  });

  it('should return an 401 status & message on failed authentication', async () => {
    const response = await request(server).get('/').set('Authorization', 'Bearer xxx');
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("invalid token")
  });
});