import { type Request, type Response } from 'express'
import { ValidationError, DatabaseError } from 'sequelize'
import bcrypt from 'bcryptjs'
import { UserRepository } from '../repositories/user.repository'

const SALT_ROUNDS = 10
const _userRepository = new UserRepository()
export const create = async (
  req: Request,
  res: Response
) => {
  const hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS)
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash
  }
  try {
    const userUniqueEmailCheck = await _userRepository.findUserByEmail(
      user.email
    )
    if (userUniqueEmailCheck !== null) {
      return res.status(422).send({
        message: 'Email has already been taken.'
      })
    }
    const newUser = await _userRepository.createUser(user)
    return res.send(newUser)
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    return res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

export const findAll = async (req: Request, res: Response) => {
  try {
    res.send(await _userRepository.findAll())
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}

export const findOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const user = await _userRepository.findUserById(id)
    if (user !== null) return res.send(user)
    return res.status(404).send({
      message: `Cannot find user with id: ${id}`
    })
  } catch (err) {
    console.log(err)
    if (err instanceof DatabaseError) {
      return res.status(400).send({
        message: 'Bad request.'
      })
    }
    return res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const oldUser = await _userRepository.findUserById(id)
    if (oldUser === null) {
      return res.status(404).send({
        message: 'User not found.'
      })
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(404).send({
        message: `Cannot update User with id=${id}, req.body is empty!`
      })
    }
    const newPassword = Object.prototype.hasOwnProperty.call(
      req.body,
      'password'
    )
      ? bcrypt.hashSync(req.body.password, SALT_ROUNDS)
      : oldUser.password
    const userBody = {
      firstName: Object.prototype.hasOwnProperty.call(req.body, 'firstName')
        ? req.body.firstName
        : oldUser.firstName,
      lastName: Object.prototype.hasOwnProperty.call(req.body, 'lastName')
        ? req.body.lastName
        : oldUser.lastName,
      email: Object.prototype.hasOwnProperty.call(req.body, 'email')
        ? req.body.email
        : oldUser.email,
      password: newPassword
    }
    const response = await _userRepository.updateUser(id, userBody)
    if (response !== null) {
      return res.send({
        message: 'User was updated successfully.'
      })
    }
    throw new Error()
  } catch (err) {
    console.log(err)
    if (err instanceof ValidationError) {
      return res.status(422).send({
        message: err.errors[0].message
      })
    }
    return res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const response = await _userRepository.deleteUser(id)
    if (response === 1) {
      return res.send({
        message: 'User was deleted successfully!'
      })
    }
    return res.status(404).send({
      message: `User with id: ${id} not found.`
    })
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    if (err instanceof DatabaseError) {
      return res.status(400).send({
        message: 'Bad request.'
      })
    }
    return res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}
