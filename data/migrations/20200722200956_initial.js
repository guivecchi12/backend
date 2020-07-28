exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.text("username").notNullable().unique();
    table.text("password").notNullable();
  });

  await knex.schema.createTable("albums", (table) => {
    table.increments();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });

  await knex.schema.createTable("user_images", (table) => {
    table.increments();
    table.text("img_url").notNullable();
    table.text("label");
    table.integer("album_id").unsigned().references("id").inTable("albums");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });

  await knex.schema.createTable("user_stories", (table) => {
    table.increments();
    table.text("story_title").notNullable();
    table.text("story_body").notNullable();
    table.integer("album_id").unsigned().references("id").inTable("albums");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_stories");
  await knex.schema.dropTableIfExists("user_images");
  await knex.schema.dropTableIfExists("albums");
  await knex.schema.dropTableIfExists("users");
};
