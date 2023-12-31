import express from 'express'

// Controllers
import {
  deleteProfilePictureController,
  getUserMetadataController,
  loginController,
  signupController,
  updateProfilePictureController,
} from '../controllers/user.controller'

// Schema
import {
  createUserSchema,
  getUserMetadataSchema,
  loginUserSchema,
  updateProfilePictureSchema,
} from '../schemaValidation/user.schema'

// Middleware
import { authMiddleware } from '../middlewares/auth'
import { validateBody } from '../middlewares/validateBody'
import { validateParams } from '../middlewares/validateParams'

const routes = express.Router()

routes.post('/signup', validateBody(createUserSchema), signupController)

routes.post('/signin', validateBody(loginUserSchema), loginController)

routes.get('/metadata', getUserMetadataController)

routes.post(
  '/update-profile-picture',
  validateBody(updateProfilePictureSchema),
  updateProfilePictureController
)

routes.delete('/profile-picture/:userId', deleteProfilePictureController)

export default routes
