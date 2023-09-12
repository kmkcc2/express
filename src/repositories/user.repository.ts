/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type User } from '../models/user'
import db from '../models/index'

const UserModel = db.models.User

export default class UserRepository {
  static async findAll () {
    return await UserModel.findAll() as User[]
  }

  static async findUserByEmail (email: string) {
    return await UserModel.findOne({ where: { email } }) as User | null
  }

  static async findUserById (id: string) {
    return await UserModel.findByPk(id) as User
  }

  static async createUser (payload: { firstName: string, lastName: string, email: string, password: string }) {
    return await UserModel.create(payload) as User
  }

  static async updateUser (id: string, payload: { firstName: string, lastName: string, email: string, password: string }) {
    return await UserModel.update(payload, {
      where: { id }
    })
  }

  static async deleteUser (id: string): Promise<number> {
    return await UserModel.destroy({ where: { id } })
  }
}
