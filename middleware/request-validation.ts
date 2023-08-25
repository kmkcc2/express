import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

export const validateRequest = (validation: any[]): any => {
  const flattenedValidationArrays = validation.flat(Infinity)
  const validationArray = [...flattenedValidationArrays]
  validationArray.push((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  })
  return validationArray
}
