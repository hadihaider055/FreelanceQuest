import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// UUID
import { UUIDV4 } from 'sequelize'

// JWT
import jwt from 'jsonwebtoken'

// Formidable
import * as formidable from 'formidable'

// Bcrypt
import bcrypt from 'bcrypt'

// Model
import User from '../models/User'

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'
import multer from 'multer'
import { uploadFile } from '../config/s3'

// const upload = multer({ dest: 'uploads/profile_pictures/' })
// const saveProfilePicture = upload.single('profile_picture')

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
        raiseException(400, 'Email already exists')
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

      raiseException(400, e.message)
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
        raiseException(400, 'User does not exist')
      }

      const isMatch = bcrypt.compareSync(password, user.password)

      if (!isMatch) {
        raiseException(400, 'Invalid credentials')
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

      raiseException(400, e.message)
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
        raiseException(400, 'User does not exist')
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

      raiseException(400, e.message)
    }
  }
)
type ControllerFunction = (
  req: any,
  res: any,
  raiseException: any
) => Promise<any>

export const updateProfilePictureController: ControllerFunction = async (
  req,
  res,
  raiseException
) => {
  const form = new formidable.IncomingForm()

  form.parse(req, async (err, fields, files) => {
    try {
      console.log('file>>', req.body, files, fields)

      const { user_id } = fields
      const file: any = files.profile_image[0]

      const userExist = await User.findOne({
        where: {
          id: user_id,
        },
      })

      if (!userExist) {
        return res.status(400).json({
          message: 'User does not exist',
          success: false,
          payload: {},
        })
      }

      if (Array.isArray(file)) {
        return res.status(400).json({
          message: 'Only single file is allowed',
          success: false,
          payload: {},
        })
      }

      if (!file) {
        return res.status(400).json({
          message: '"file" is required',
          success: false,
          payload: {},
        })
      }

      if (err) {
        return res.status(400).json({
          message: 'Failed to parse body',
          success: false,
          payload: {
            err,
          },
        })
      }

      if (
        !['image/jpg'].includes(file?.mimetype || '') &&
        !['image/jpeg'].includes(file?.mimetype || '') &&
        !['image/png'].includes(file?.mimetype || '')
      ) {
        return res.status(400).json({
          message: 'Unsupported file format',
          success: false,
          payload: {},
        })
      }

      const fileUniqueName = `users/${user_id}/profile-image/${UUIDV4()}-${
        file.originalFilename
      }`

      const oldFilename = userExist.profileImage.split('/').pop().split('?')[0]
      const oldUrlKey = `users/${user_id}/profile-image/${oldFilename}`

      const response = await uploadFile(
        file.filepath,
        fileUniqueName,
        null,
        oldUrlKey
      )

      const user = await User.update(
        {
          profileImage: response.publicUrl,
        },
        {
          returning: true,
          where: {
            id: user_id,
          },
        }
      )

      return res.status(200).json({
        message: 'Profile picture updated successfuly',
        success: true,
        payload: {
          user: user[1][0],
        },
      })
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to update profile picture'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(400, e.message)
    }
  })
}
