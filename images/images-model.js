const db = require("../data/db.config");

function findImages() {
  return db("user_images");
}

function findByImageId(id) {
  return db("user_images").where("id", id).first();
}

function findByUserId(userId) {
  return db("user_images as i")
    .leftJoin("users as u", "u.id", "i.user_id")
    .where("user_id", userId)
    .select("i.id", "i.img_url", "i.user_id");
}

async function addImage(data) {
  const [id] = await db("user_images").returning("id").insert(data);
  return findByImageId(id);
}

function removeImage(id) {
  return db("user_images").where({ id }).del();
}

async function updateImage(id, newUrl) {
  return db("user_images").where("id", id).update(newUrl);
}

module.exports = {
  findImages,
  findByImageId,
  findByUserId,
  addImage,
  removeImage,
  updateImage,
};
