import joi from 'joi'

export const createChatSchema = joi.object().keys({
  freelancer_id: joi.string().uuid({ version: 'uuidv4' }).required(),
  client_id: joi.string().uuid({ version: 'uuidv4' }).required(),
})

export const getChatsByUserIdSchema = joi.object().keys({
    user_id: joi.string().uuid({ version: 'uuidv4' }).required(),
})

export const getChatByIdSchema = joi.object().keys({
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
})
