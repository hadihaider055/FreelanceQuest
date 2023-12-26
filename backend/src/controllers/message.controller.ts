// @ts-nocheck

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'

// Model
import Message from '../models/Message'

export const createMessageController = generateController(
  async (req, res, raiseException) => {
    try {
      const { chat_id, sender_id, message } = req.body

      const msg = Message.create({ user_id: sender_id, content: message, chat_id: chat_id })

      return {
        message: 'Message posted successfully',
        payload: {
          msg,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to post message'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)
