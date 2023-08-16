const express = require("express");
const router = express.Router();
const { create, findAll, findOne, update, destroy } = require("../controllers/user.controller.js");
const { createValidation, putValidation } = require("../middleware/validators/users-requests-validations.js");
const { validateRequest } = require("../middleware/request-validation.js");

router
  .route("/:id")
  .get(findOne)
  .put(validateRequest(putValidation), update)
  .delete(destroy);

router
  .route("/")
  .get(findAll)
  .post(validateRequest(createValidation), create);

module.exports = router;
