import express from 'express'
import { validateBody } from '../middlewares/validateBody'

// Controllers
import { createJobController } from '../controllers/job.controller'

// Schema
import { createJobPostSchema } from '../schemaValidation/job.schema'

const routes = express.Router()

routes.post('/create', validateBody(createJobPostSchema), createJobController)

export default routes
