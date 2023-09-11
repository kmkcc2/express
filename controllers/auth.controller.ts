import bcrypt from 'bcryptjs'
import { type Response, type Request } from 'express'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository'

const _userRepository = new UserRepository()

export const login = async (
  req: Request,
  res: Response
) => {
  const user = await _userRepository.findUserByEmail(req.body.email)
  if (!user) {
    return res
      .status(404)
      .send({ message: 'User with provided email does not exist.' })
  }
  const payload: { id: number, firstName: string, lastName: string, email: string } = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const SECRET = process.env.ACCESS_TOKEN_SECRET as string
    const accessToken = jwt.sign(payload, SECRET, { expiresIn: '1h' })
    return res.send(
      {
        token: accessToken
      })
  }
  return res.status(401).send({ message: 'Password is invalid' })
}
