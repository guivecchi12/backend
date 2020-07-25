const express = require("express");
const imagesModel = require("./images-model");

const router = express.Router({
  mergeParams: true,
});

module.exports = router;

/////////////// GET ///////////////

router.get("/", async (req, res, next) => {
  try {
    const images = await imagesModel.findByUserId(req.params.id);
    // if (!images) {
    //     return res.json({
    //         message: "This user does not have any images yet."
    //     })
    // }

    res.json(images);
  } catch (err) {
    next(err);
  }
});

router.get("/:imgs_id", async (req, res, next) => {
  try {
    const image = await imagesModel.findByImageId(req.params.imgs_id);
    if (!image) {
      return res.status(404).json({
        message: "The image you are looking for cannot be found.",
      });
    }

    res.json(image);
  } catch (err) {
    next(err);
  }
});

/////////////// POST ///////////////

router.post("/", async (req, res, next) => {
  try {
    const imageInfo = await imagesModel.addImage({
      ...req.body,
      user_id: req.params.id,
    });
    res.status(201).json(imageInfo);
  } catch (err) {
    next(err);
  }
});

/////////////// PUT ///////////////

router.put("/:imgs_id", async (req, res, next) => {
  try {
    const newImageInfo = await imagesModel.updateImage(
      req.params.imgs_id,
      req.body
    );
    res.status(202).json({
      message: `Image url has been updated to ${req.body.img_url}`,
    });
  } catch (err) {
    next(err);
  }
});

/////////////// DELETE ///////////////

router.delete("/:imgs_id", async (req, res, next) => {
  try {
    await imagesModel
      .removeImage(req.params.imgs_id)
      .then(() => res.status(204).end());
  } catch (err) {
    next(err);
  }
});
