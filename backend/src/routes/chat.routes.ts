import express from 'express'

// Controllers
import {
    chatSignalingController,
    createChatController,
    getChatById,
    getChatsByUserId,
} from '../controllers/chat.controller'
  
// Schema
import {
  createChatSchema, getChatsByUserIdSchema, getChatByIdSchema
} from '../schemaValidation/chat.schema'

// Middlewares
import { authMiddleware } from '../middlewares/auth'
import { validateBody } from '../middlewares/validateBody'
import { validateParams } from '../middlewares/validateParams'

const router = express.Router()

// Perform webrtc signaling
router.ws('/signaling/:from_username/', chatSignalingController)

// Create Chat
router.post('/create', 
authMiddleware(),
validateBody(createChatSchema), createChatController)

// Fetch chat ids by user id
router.get(
    '/user/:user_id/',
    authMiddleware(),
    validateParams(getChatsByUserIdSchema),
    getChatsByUserId
)

// Fetch chat by chat id
router.get(
  '/:id',
  authMiddleware(),
  validateParams(getChatByIdSchema),
  getChatById
)

export default router
