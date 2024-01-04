import express from 'express'

// Controllers
import {
  acceptProposalController,
  createProposalController,
  getAllProposalsController,
  getProposalByIdController,
} from '../controllers/proposal.controller'

// Schema
import {
  getAllProposalsSchema,
  getProposalByIdSchema,
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

// Get proposal by ID
router.get(
  '/:proposalId',
  authMiddleware(),
  validateParams(getProposalByIdSchema),
  getProposalByIdController
)

// Accept proposal
router.get(
  '/:proposalId/accept',
  authMiddleware(),
  acceptProposalController
)

export default router
