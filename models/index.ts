"use strict";
import { User } from "./user";
import { Sequelize } from "sequelize-typescript";
import process from "process";
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];

let sequelize: any;

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

sequelize.addModels([User]);

export default sequelize;
