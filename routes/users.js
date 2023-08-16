const express = require("express");
const router = express.Router();
const { create, findAll, findOne, update, destroy } = require("../controllers/user.controller.js");
const { findOneValidation, createValidation, putValidation, destroyValidation } = require("../middleware/validators/users-requests-validations.js");
const { validateRequest } = require("../middleware/request-validation.js");

router
  .route("/:id")
  .get(...findOneValidation, findOne)
  .put(...putValidation, update)
  .delete(...destroyValidation, destroy);

router
  .route("/")
  .get(findAll)
  .post(...createValidation, create);

module.exports = router;
