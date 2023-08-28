import express from 'express'
import { login } from '../controllers/auth.controller'
import { create } from '../controllers/user.controller'
import { validateRequest } from '../middleware/request-validation'
import { createValidation } from '../middleware/validators/users-requests-validations'
const router = express.Router()

router
  .route('/login')
  .post(login)

router
  .route('/register')
  .post(validateRequest(createValidation), create)

export default router
