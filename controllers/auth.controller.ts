import db from '../models/index'
import { type IUser, type TypedRequestBody } from '../common/interfaces'
import bcrypt from 'bcryptjs'
import { type Response } from 'express'
import jwt from 'jsonwebtoken'

const User = db.models.User

export const login: any = async (
  req: TypedRequestBody<{
    email: string
    password: string
  }>,
  res: Response
) => {
  const user: IUser | any = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (user === null) {
    return res
      .status(401)
      .send({ message: 'User with provided email does not exist.' })
  }
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const SECRET: string = process.env.ACCESS_TOKEN_SECRET as string
    const accessToken = jwt.sign(payload, SECRET, { expiresIn: '1h' })
    return res.send(
      {
        message: 'loggin in successful',
        token: accessToken
      })
  }
  return res.status(401).send({ message: 'Password is invalid' })
}
export const register: any = (req: Request, res: Response) => {}
