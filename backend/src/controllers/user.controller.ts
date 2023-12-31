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
import multer from 'multer'

const upload = multer({ dest: 'uploads/profile_pictures/' })
const saveProfilePicture = upload.single('profile_picture');

export const updateProfilePictureController = generateController(
  async (req, res, raiseException) => {
    try {

      const { user_id } = req.body;

      saveProfilePicture(req, res, async (err) => {
        if (err) {
          raiseException(httpStatus.BAD_REQUEST, err)
        }

        const user = await User.findOne({
          where: {
            id: user_id
          }
        })

        user.profileImage = req.file.path
        user.save();
      })

      return {
        message: 'Profile picture updated successfuly',
        payload: {},
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to update profile picture'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)

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
            category: user.category,
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
      // const token = req.headers.authorization?.replace('Bearer ', '')

      // if (!token) {
      //   throw new Error('Token is required for authentication')
      // }

      // const decode = jwt.decode(token)

      // if (typeof decode == 'string' || !decode) {
      //   throw new Error('Invalid token')
      // }

      // NOTE: This is a workaround for now since we don't have a proper implementation on the frontend :(
      const { email } = req.query

      const user = await User.findOne({
        where: {
          email: email,
          // email: decode?.email! as string,
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
            category: user.category,
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
