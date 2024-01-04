import express from 'express'

// Controllers
import {
  createJobController,
  getAllJobsController,
  getJobById,
  getUserJobFeedController,
} from '../controllers/job.controller'

// Schema
import {
  createJobPostSchema,
  getJobByIdSchema,
} from '../schemaValidation/job.schema'

// Middlewares
import { authMiddleware } from '../middlewares/auth'
import { validateParams } from '../middlewares/validateParams'
import { validateBody } from '../middlewares/validateBody'

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

// Fetch job by id
router.get(
  '/:id',
  authMiddleware(),
  validateParams(getJobByIdSchema),
  getJobById
)

// Fetch user job feed
router.get(
  '/user/:id',
  authMiddleware(),
  validateParams(getJobByIdSchema),
  getUserJobFeedController
)

export default router
