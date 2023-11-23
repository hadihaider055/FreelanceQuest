import express from 'express'
import { chatSignalingController } from '../controllers/chat.controller';

const router = express.Router()

router.ws('/signaling/:from_username/', chatSignalingController)

export default router
