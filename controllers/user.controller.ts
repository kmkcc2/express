import { Request, Response } from "express";
import { ValidationError, DatabaseError } from "sequelize";
import db from "../models/index";
import bcrypt from "bcrypt";
import { TypedRequestBody } from "../common/interfaces";
const SALT_ROUNDS = 10;
const User = db.models.User;

export const create = async (
  req: TypedRequestBody<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>,
  res: Response
) => {
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
    if (err instanceof Error) console.log(err.message);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Id must be specified");
    const user = await User.findByPk(id);
    if (user) return res.send(user);
    return res.status(404).send({
      message: `Cannot find user with id: ${id}`,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof DatabaseError) {
      return res.status(400).send({
        message: "Bad request.",
      });
    }
    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

export const update = async (
  req: TypedRequestBody<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>,
  res: Response
) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Id must be specified");
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
      message: `Cannot update User with id=${id}, req.body is empty!`,
    });
  } catch (err) {
    console.log(err);
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

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Id must be specified");
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
    if (err instanceof Error) console.log(err.message);
    if (err instanceof DatabaseError) {
      return res.status(400).send({
        message: "Bad request.",
      });
    }
    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};
