import joi from 'joi'

export const createUserSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
})
