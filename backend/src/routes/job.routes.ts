import express from 'express'
import { validateBody } from '../middlewares/validateBody'

// Controllers
import {
  createJobController,
  getAllJobsController,
} from '../controllers/job.controller'

// Schema
import { createJobPostSchema } from '../schemaValidation/job.schema'

// Middlewares
import { authMiddleware } from '../middlewares/auth'

const router = express.Router()

// Get all Jobs
router.get('/', authMiddleware(), getAllJobsController)

// Create Job
router.post(
  '/create',
  authMiddleware(),
  validateBody(createJobPostSchema),
  createJobController
)

export default router
