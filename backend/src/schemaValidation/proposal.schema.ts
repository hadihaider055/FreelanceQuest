import joi from 'joi'

// Type

export const submitProposalSchema = joi.object().keys({
  job_id: joi.string().uuid({ version: 'uuidv4' }).required(),
  user_id: joi.string().uuid({ version: 'uuidv4' }).required(),
  proposed_price: joi.number().required(),
  cover_letter: joi.string().required(),
})

export const getAllProposalsSchema = joi.object({
  jobId: joi.string().uuid({ version: 'uuidv4' }).optional(),
  userId: joi.string().uuid({ version: 'uuidv4' }).optional(),
})

export const getProposalByIdSchema = joi.object({
  proposalId: joi.string().uuid({ version: 'uuidv4' }).required(),
})
