const express = require("express");
const images = require("./images/images-model");
const stories = require("./stories/stories-model");

const router = express.Router();

router.get("/images", async (req, res) => {
  const imgs = await images.findImages();
  res.json(imgs);
});

router.get("/stories", async (req, res) => {
  const story = await stories.findStories();
  res.json(story);
});

module.exports = router;
