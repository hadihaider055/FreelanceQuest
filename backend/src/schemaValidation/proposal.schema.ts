import joi from 'joi'

// Type

export const submitProposalSchema = joi.object().keys({
  job_id: joi.string().uuid({ version: 'uuidv4' }).required(),
  user_id: joi.string().uuid({ version: 'uuidv4' }).required(),
  proposed_price: joi.number().required(),
  cover_letter: joi.string().required(),
})
