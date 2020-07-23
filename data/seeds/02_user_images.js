exports.seed = async function (knex) {
  await knex("user_images").truncate();
  await knex("user_images").insert([
    { img_url: "https://unsplash.com/photos/eU4pipU_8HA", user_id: 1 },
    { img_url: "https://unsplash.com/photos/B79-r_b3sbc", user_id: 1 },
    { img_url: "https://unsplash.com/photos/I-Cu1x2DUAY", user_id: 2 },
    { img_url: "https://unsplash.com/photos/IBa3Bf69c_M", user_id: 2 },
    { img_url: "https://unsplash.com/photos/boyXZfqpwpU", user_id: 3 },
    { img_url: "https://unsplash.com/photos/ONVA6s03hg8", user_id: 3 },
  ]);
};
