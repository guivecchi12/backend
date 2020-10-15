const express = require("express")
const Users = require("./users-model")

const imagesRouter = require("../images/images-router")
const storiesRouter = require("../stories/stories-router")

const router = express.Router()

router.use("/:id/images", imagesRouter)
router.use("/:id/stories", storiesRouter)

router.get("/", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        errorMessage: "The user with that id cannot be found.",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});


router.get("/:id/images", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        errorMessage: "The user with that id cannot be found.",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
