import joi from 'joi'

export const createUserSchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
})

export const loginUserSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
})
