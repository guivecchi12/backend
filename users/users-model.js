const db = require("../data/db.config");

async function add(user) {
  const [id] = await db("users").insert(user).returning("id");
  return findById(id);
}

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
