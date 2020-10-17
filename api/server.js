const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/status', async (req, res) => {
  //checking knex status too
  res.status(200).json({
    api: true,
    db: await getDbStatus(),
    //jokeApi: await getJokeStatus
  });
});

module.exports = server;

async function getDbStatus() {
  try{
    await knex.raw('select 1+1 as result');
    return true;
  } catch(err) {
    return false;
  }
}