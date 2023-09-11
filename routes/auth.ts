import express from 'express'
import { login } from '../controllers/auth.controller'
import { create } from '../controllers/user.controller'
import { validateRequest } from '../middleware/request-validation'
import { createValidation } from '../middleware/validators/users-requests-validations'
import loginValidation from '../middleware/validators/login-validations'

const router = express.Router()

router
  .route('/login')
  .post(validateRequest(loginValidation), login)

router
  .route('/register')
  .post(validateRequest(createValidation), create)

export default router
