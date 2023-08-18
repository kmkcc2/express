const express = require("express");
const { validationResult } = require("express-validator");

exports.validateRequest = (validation) => {
  let flattenedValidationArrays = validation.flat(Infinity);
  let validationArray = [...flattenedValidationArrays];
  validationArray.push((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });
  return validationArray;
};
