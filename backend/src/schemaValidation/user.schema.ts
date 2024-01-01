import joi from 'joi'

// Types
import { UserRoleEnum } from '../models'

export const createUserSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  role: joi
    .string()
    .valid(...Object.keys(UserRoleEnum))
    .required(),
})

export const loginUserSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
})

export const getUserMetadataSchema = joi.object().keys({
  email: joi.string().email().required(),
})

export const updateProfilePictureSchema = joi.object().keys({
  user_id: joi.string().uuid({ version: 'uuidv4' }),
})
