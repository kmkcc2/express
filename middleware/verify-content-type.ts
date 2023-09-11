import { type Request, type Response, type NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  if ((req.method !== 'GET' && req.method !== 'DELETE') && !req.is('application/json')) {
    return res.status(415).send({ message: 'Invalid Content-Type header' })
  }
  next()
}
