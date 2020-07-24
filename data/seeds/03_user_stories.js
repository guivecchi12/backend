exports.seed = async function (knex) {
  await knex("user_stories").truncate();
  await knex("user_stories").insert([
    {
      story_title: "user1, story1",
      story_body: "Example story number 1 for user number 1.",
      user_id: 1,
    },
    {
      story_title: "user1, story2",
      story_body: "Example story number 2 for user number 1.",
      user_id: 1,
    },
    {
      story_title: "user2, story1",
      story_body: "Example story number 1 for user number 2.",
      user_id: 2,
    },
    {
      story_title: "user2, story2",
      story_body: "Example story number 2 for user number 2.",
      user_id: 2,
    },
    {
      story_title: "user3, story1",
      story_body: "Example story number 1 for user number 3.",
      user_id: 3,
    },
    {
      story_title: "user3, story2",
      story_body: "Example story number 2 for user number 3.",
      user_id: 3,
    },
  ]);
};
