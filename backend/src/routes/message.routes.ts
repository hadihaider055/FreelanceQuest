import express from 'express'

// Controllers
import {
    createMessageController
} from '../controllers/message.controller'
  
// Schema
import {
  createMessageSchema
} from '../schemaValidation/message.schema'

// Middlewares
import { authMiddleware } from '../middlewares/auth'
import { validateBody } from '../middlewares/validateBody'

const router = express.Router()

// Create a message
router.post('/', 
authMiddleware(),
validateBody(createMessageSchema), createMessageController)

export default router
