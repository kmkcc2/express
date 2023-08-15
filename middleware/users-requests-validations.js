const { param, body } = require("express-validator");

exports.findOneValidation = [
  param("id").isInt().withMessage("Id must be integer."),
];
exports.createValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name must be present.")
    .isString(),
  body("lastName")
    .notEmpty()
    .withMessage("Last name must be present.")
    .isString(),
  body("email")
    .isEmail()
    .withMessage("Email field must be an actual email address."),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("Password must be longer than 8 characters."),
];
exports.putValidation = [
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email field must be an actual email address."),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("Password must be longer than 8 characters."),
];
exports.destroyValidation = [
  param("id").isInt().withMessage("Id must be integer."),
];
