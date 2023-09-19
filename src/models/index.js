'use strict'
import { User } from './user'
import { Sequelize } from 'sequelize-typescript'
import process from 'process'
import config from '../config/config.js'
const env = process.env.NODE_ENV ?? 'development'

const configEnv = config[env]

const sequelize = new Sequelize(
  configEnv.DATABASE_URL
)
sequelize.addModels([User])

export default sequelize
