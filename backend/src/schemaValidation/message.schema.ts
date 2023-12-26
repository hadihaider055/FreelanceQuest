import joi from 'joi'

export const createMessageSchema = joi.object().keys({
    sender_id: joi.string().uuid({ version: 'uuidv4' }).required(),
    chat_id: joi.string().uuid({ version: 'uuidv4' }).required(),
    message: joi.string().required(),
})
