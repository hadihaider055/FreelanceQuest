import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// Model
import User from '../models/User'

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'

export const signupController = generateController(
  async (req, res, raiseException) => {
    try {
      const { email, password } = req.body

      const user = new User({
        email,
        password,
      })

      await user.save()

      return {
        message: 'Signed up successfully',
        payload: {
          user,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to login'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)
