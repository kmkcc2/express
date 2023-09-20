import express from 'express'
import { findAll, findOne, update, destroy } from '../controllers/user.controller'
import { putValidation } from '../middleware/validators/users-requests-validations'
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

export default router
