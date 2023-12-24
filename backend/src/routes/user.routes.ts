import express from 'express'
import { validateBody } from '../middlewares/validateBody'

// Controllers
import {
  getUserMetadataController,
  loginController,
  signupController,
} from '../controllers/user.controller'

// Schema
import {
  createUserSchema,
  loginUserSchema,
} from '../schemaValidation/user.schema'

// Middleware
import { authMiddleware } from '../middlewares/auth'

const routes = express.Router()

routes.post('/signup', validateBody(createUserSchema), signupController)

routes.post('/signin', validateBody(loginUserSchema), loginController)

routes.get('/metadata', getUserMetadataController, authMiddleware())

export default routes
