import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// JWT
import jwt from 'jsonwebtoken'

// Bcrypt
import bcrypt from 'bcrypt'

// Model
import User from '../models/User'

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'

export const signupController = generateController(
  async (req, res, raiseException) => {
    try {
      const { email, password, firstName, lastName } = req.body

      const isExist = await User.findOne({
        where: {
          email,
        },
      })

      if (isExist) {
        raiseException(httpStatus.BAD_REQUEST, 'Email already exists')
      }

      const user = new User({
        firstName,
        lastName,
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

      let errorMessage = 'Failed to signup'
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

      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      // })

      return {
        message: 'Logged in successfully',
        payload: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            title: user.title,
            description: user.description,
            profileImage: user.profileImage,
            languages: user.languages,
            hourlyRate: user.hourlyRate,
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

export const getUserMetadataController = generateController(
  async (req, res, raiseException) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        throw new Error('Token is required for authentication')
      }

      const decode = jwt.decode(token)

      if (typeof decode == 'string' || !decode) {
        throw new Error('Invalid token')
      }

      const user = await User.findOne({
        where: {
          email: decode?.email! as string,
        },
      })

      if (!user) {
        raiseException(httpStatus.BAD_REQUEST, 'User does not exist')
      }

      return {
        message: 'Fetched metadata successfully',
        payload: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            title: user.title,
            description: user.description,
            profileImage: user.profileImage,
            languages: user.languages,
            hourlyRate: user.hourlyRate,
          },
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
