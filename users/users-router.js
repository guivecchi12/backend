const express = require("express");
const Users = require("./users-model");

const imagesRouter = require("../images/images-router");
const storiesRouter = require("../stories/stories-router");

const router = express.Router();

//router.use("/:id/images", imagesRouter);
router.use("/:id/stories", storiesRouter);

// This is for the /users endpoint and will only be available to logged-in users once we create and call the `restrict` middleware.

//////////////    /users    //////////////
//*******    Not sure that this is needed *******//

router.get("/", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

//////////////    /users/:id    //////////////

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

//////////////    /users/:id/images    //////////////

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
