import express from 'express'

// Controllers
import {
  deleteProfilePictureController,
  getUserMetadataController,
  loginController,
  signupController,
  updateProfileController,
  updateProfilePictureController,
} from '../controllers/user.controller'

// Schema
import {
  createUserSchema,
  getUserMetadataSchema,
  loginUserSchema,
  updateProfilePictureSchema,
  updateProfileSchema,
} from '../schemaValidation/user.schema'

// Middleware
import { authMiddleware } from '../middlewares/auth'
import { validateBody } from '../middlewares/validateBody'
import { validateParams } from '../middlewares/validateParams'

const routes = express.Router()

routes.post('/signup', validateBody(createUserSchema), signupController)

routes.post('/signin', validateBody(loginUserSchema), loginController)

routes.get('/metadata', getUserMetadataController, authMiddleware())

routes.post(
  '/update-profile-picture',
  validateBody(updateProfilePictureSchema),
  authMiddleware(),
  updateProfilePictureController
)

routes.delete(
  '/profile-picture/:userId',
  deleteProfilePictureController,
  authMiddleware()
)

routes.patch(
  '/profile/:userId',
  validateBody(updateProfileSchema),
  authMiddleware(),
  updateProfileController
)

export default routes
