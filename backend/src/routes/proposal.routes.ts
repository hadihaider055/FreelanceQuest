import express from 'express'

// Controllers
import { createProposalController } from '../controllers/proposal.controller'

// Schema
import { submitProposalSchema } from '../schemaValidation/proposal.schema'

// Middlewares
import { authMiddleware } from '../middlewares/auth'
import { validateBody } from '../middlewares/validateBody'

const router = express.Router()

// Submit Proposal
router.post(
  '/submit',
  authMiddleware(),
  validateBody(submitProposalSchema),
  createProposalController
)

export default router
