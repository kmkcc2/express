const { ValidationError } = require("sequelize");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

exports.create = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  };
  try {
    const userUniqueEmailCheck = await User.findAll({
      where: { email: user.email },
    });
    if (userUniqueEmailCheck.length > 0) {
      return res.status(422).send({
        message: "Email has already been taken.",
      });
    }
    const newUser = await User.create(user);
    return res.send(newUser);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id) || id === " " || id === "") {
      return res.status(400).send({
        message: "Bad request",
      });
    }
    const user = await User.findByPk(id);
    if (user) return res.send(user);

    return res.status(404).send({
      message: `Cannot find user with id: ${id}`,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id) || id === " " || id === "") {
      return res.status(400).send({
        message: "Bad request",
      });
    }
    const oldUser = await User.findByPk(id);
    if (!oldUser) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    const newPassword = req.body.password
      ? bcrypt.hashSync(req.body.password, SALT_ROUNDS)
      : oldUser.password;
    const userBody = {
      firstName: req.body.firstName ? req.body.firstName : oldUser.firstName,
      lastName: req.body.lastName ? req.body.lastName : oldUser.lastName,
      email: req.body.email ? req.body.email : oldUser.email,
      password: newPassword,
    };
    const response = await User.update(userBody, {
      where: { id },
    });
    if (response) {
      return res.send({
        message: "User was updated successfully.",
      });
    }

    return res.status(404).send({
      message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
    });
  } catch (err) {
    console.log(err.message);
    if (err instanceof ValidationError) {
      return res.status(422).send({
        message: err.errors[0].message,
      });
    }
    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id) || id === " " || id === "") {
      return res.status(400).send({
        message: "Bad request",
      });
    }
    const response = await User.destroy({
      where: { id },
    });
    if (response) {
      return res.send({
        message: "User was deleted successfully!",
      });
    }
    return res.status(404).send({
      message: `User with id: ${id} not found.`,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};
