import express from 'express'
import { validateBody } from '../middlewares/validateBody'

// Controllers
import { signupController } from '../controllers/user.controller'

// Schema
import { createUserSchema } from '../schemaValidation/user.schema'

const routes = express.Router()

routes.post('/', validateBody(createUserSchema), signupController)

export default routes
