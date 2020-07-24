const express = require("express");
const storiesModel = require("./stories-model");

const router = express.Router({
  mergeParams: true,
});

module.exports = router;

/////////////// GET ///////////////

router.get("/", async (req, res, next) => {
  try {
    const stories = await storiesModel.findByUserId(req.params.id);
    // if (!stories) {
    //     return res.json({
    //         message: "This user does not have any stories yet."
    //     })
    // }

    res.json(stories);
  } catch (err) {
    next(err);
  }
});

router.get("/:story_id", async (req, res, next) => {
  try {
    const story = await storiesModel.findByStoryId(req.params.story_id);
    if (!story) {
      return res.status(404).json({
        message: "The story you are looking for cannot be found.",
      });
    }

    res.json(story);
  } catch (err) {
    next(err);
  }
});

/////////////// POST ///////////////

router.post("/", async (req, res, next) => {
  try {
    const storyInfo = await storiesModel.addStory({
      ...req.body,
      user_id: req.params.id,
    });
    res.status(201).json(storyInfo);
  } catch (err) {
    next(err);
  }
});

/////////////// PUT ///////////////

router.put("/:story_id", async (req, res, next) => {
  try {
    const newStoryInfo = await storiesModel.updateStory(
      req.params.story_id,
      req.body
    );
    res.status(202).json({
      message: `Story title is now: ${req.body.story_title}, and story body is now: ${req.body.story_body}.`,
    });
  } catch (err) {
    next(err);
  }
});

/////////////// DELETE ///////////////

router.delete("/:story_id", async (req, res, next) => {
  try {
    await storiesModel
      .removeStory(req.params.story_id)
      .then(() => res.status(204).end());
  } catch (err) {
    next(err);
  }
});
