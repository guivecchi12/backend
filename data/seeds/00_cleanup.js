exports.seed = async function (knex) {
  await knex("user_stories").truncate();
  await knex("user_images").truncate();
  await knex("users").truncate();
};
