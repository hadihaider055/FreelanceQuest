import express from 'express'

// Controllers
import {
  createProposalController,
  getAllProposalsController,
} from '../controllers/proposal.controller'

// Schema
import {
  getAllProposalsSchema,
  submitProposalSchema,
} from '../schemaValidation/proposal.schema'

// Middlewares
import { authMiddleware } from '../middlewares/auth'
import { validateBody } from '../middlewares/validateBody'
import { validateParams } from '../middlewares/validateParams'

const router = express.Router()

// Submit Proposal
router.post(
  '/submit',
  authMiddleware(),
  validateBody(submitProposalSchema),
  createProposalController
)

// Get all Proposals
router.get(
  '/',
  authMiddleware(),
  validateParams(getAllProposalsSchema),
  getAllProposalsController
)

export default router
