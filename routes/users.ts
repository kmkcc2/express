import express from 'express'
import { create, findAll, findOne, update, destroy } from '../controllers/user.controller'
import { createValidation, putValidation } from '../middleware/validators/users-requests-validations'
import { validateRequest } from '../middleware/request-validation'
const router = express.Router()

router
  .route('/:id')
  .get(findOne)
  .put(validateRequest(putValidation), update)
  .delete(destroy)

router
  .route('/')
  .get(findAll)
  .post(validateRequest(createValidation), create)

export default router
