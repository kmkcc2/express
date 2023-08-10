const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { check } = require("express-validator");

exports.create = (req, res) => {
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

  User.findAll({where: {email: user.email}}).then(exist => {
    if(exist.length > 0){
        console.log(exist)
        return res.status(422).send({
            message: 'Email has already been taken.'
        })
    }else{
        User.create(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating new user.",
          });
        });
    }
  })

};

exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while while looking for users.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else {
        res.status(404).send({
          message: `Cannot find user with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while looking for user.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.destroy = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
