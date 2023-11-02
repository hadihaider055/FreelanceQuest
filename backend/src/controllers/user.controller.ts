import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// JWT
import jwt from 'jsonwebtoken'

// Bcrypt
import bcrypt from 'bcrypt'

// UUID
import { v4 as uuidv4 } from 'uuid'

// Model
import User from '../models/User'

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'

export const signupController = generateController(
  async (req, res, raiseException) => {
    try {
      const { email, password } = req.body

      const isExist = await User.findOne({
        where: {
          email,
        },
      })

      if (isExist) {
        raiseException(httpStatus.BAD_REQUEST, 'Email already exists')
      }

      const user = new User({
        id: uuidv4(),
        email,
        password: bcrypt.hashSync(password, 10),
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

export const loginController = generateController(
  async (req, res, raiseException) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email,
        },
      })

      if (!user) {
        raiseException(httpStatus.BAD_REQUEST, 'User does not exist')
      }

      const isMatch = bcrypt.compareSync(password, user.password)

      if (!isMatch) {
        raiseException(httpStatus.BAD_REQUEST, 'Invalid credentials')
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || 'freelance-platform-secret',
        { expiresIn: '7d' }
      )

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })

      return {
        message: 'Logged in successfully',
        payload: {
          user: {
            id: user.id,
            email: user.email,
          },
          token,
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
