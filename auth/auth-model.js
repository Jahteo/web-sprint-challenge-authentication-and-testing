const db = require("../database/dbConfig")

module.exports = {
  add,
  findById,
  findBy,
};


async function add (user) {
  try {
    const [id] = await db("users").insert(user, "id")
    return findById(id);
  } catch (error) {
    throw new Error(`cannot create user ${user.username}`);
  }
}

function findBy (filter) {
  return db("users")
    .where(filter)
}

function findById(id) {
  return db("users")
  .where({ id }).first();
}