const express = require("express");
const { User } = require("../models/index.js");
const router = express.Router();
const { create, findAll, findOne, update, destroy } = require("../controllers/user.controller.js");
router
  .route("/:id")
  .get(findOne)
  .put(update)
  .delete(destroy);

router
  .route("/")
  .get(findAll)
  .post(create);

module.exports = router;
