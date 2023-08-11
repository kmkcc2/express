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
    } else {
      const newUser = await User.create(user);
      return res.send(newUser);
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating new user.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while looking for users.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user) return res.send(user);
    else {
      return res.status(404).send({
        message: `Cannot find user with id: ${id}`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while looking for user.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.update(req.body, {
      where: { id: id },
    });
    if (response == 1) {
      return res.send({
        message: "User was updated successfully.",
      });
    } else {
      return res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.destroy({
      where: { id: id },
    });
    if (response == 1) {
      return res.send({
        message: "User was deleted successfully!",
      });
    } else {
      return res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Could not delete User with id=" + id,
    });
  }
};
