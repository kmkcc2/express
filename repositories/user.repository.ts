import { type User } from '../models/user'
import db from '../models/index'

const UserModel = db.models.User

export class UserRepository {
  async findAll () {
    return await UserModel.findAll() as User[]
  }

  async findUserByEmail (email: string) {
    return await UserModel.findOne({ where: { email } }) as User
  }

  async findUserById (id: string) {
    return await UserModel.findByPk(id) as User
  }

  async createUser (payload: { firstName: string, lastName: string, email: string, password: string }) {
    return await UserModel.create(payload) as User
  }

  async updateUser (id: string, payload: { firstName: string, lastName: string, email: string, password: string }) {
    return await UserModel.update(payload, {
      where: { id }
    })
  }

  async deleteUser (id: string): Promise<number> {
    return await UserModel.destroy({ where: { id } })
  }
}
