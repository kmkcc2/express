import { type Request } from 'express'

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
