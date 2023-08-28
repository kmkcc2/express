import { type Response, type Request } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
export default function authorize (req: Request, res: Response, next: any): any {
  const authHeader = req.headers.authorization
  try {
    if (typeof authHeader === 'undefined') {
      throw new Error('Authorization header is missing')
    }
    const token = authHeader.split(' ')[1]
    const SECRET = process.env.ACCESS_TOKEN_SECRET as string
    if (token === null) return res.status(401).send({ message: 'Unauthorized' })
    jwt.verify(token, SECRET, (err, user: any) => {
      if (err != null) {
        if (err instanceof TokenExpiredError) {
          return res.status(403).send({ message: 'Token has expired, please sign in again' })
        }
        return res.status(403).send({ message: 'Invalid token signature' })
      }
      next()
    })
  } catch (err: any) {
    console.log(err)
    return res.status(401).send({ message: 'Unauthorized. ' + err.message })
  }
}
