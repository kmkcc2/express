const express = require("express");
const router = express.Router();
const { create, findAll, findOne, update, destroy } = require("../controllers/user.controller.js");
const { findOneValidation, createValidation, putValidation, destroyValidation } = require("../middleware/users-requests-validations.js");
const { validateRequest } = require("../middleware/request-validation.js");

router
  .route("/:id")
  .get(...findOneValidation, validateRequest, findOne)
  .put(...putValidation, validateRequest, update)
  .delete(...destroyValidation, validateRequest, destroy);

router
  .route("/")
  .get(findAll)
  .post(...createValidation, validateRequest, create);

module.exports = router;
