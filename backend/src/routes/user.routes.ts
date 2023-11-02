import express from 'express'
import { validateBody } from '../middlewares/validateBody'

// Controllers
import {
  loginController,
  signupController,
} from '../controllers/user.controller'

// Schema
import {
  createUserSchema,
  loginUserSchema,
} from '../schemaValidation/user.schema'

const routes = express.Router()

routes.post('/signup', validateBody(createUserSchema), signupController)

routes.post('/signin', validateBody(loginUserSchema), loginController)

export default routes
