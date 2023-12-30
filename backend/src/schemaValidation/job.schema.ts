import joi from 'joi'

// Type
import { JobTypeStatusEnum } from '../models/Job'

export const createJobPostSchema = joi.object().keys({
  title: joi.string().required(),
  description: joi.string().required().min(10),
  posted_by: joi.string().required(),
  price: joi.number().required(),
  category: joi.string().required(),
  featured: joi.boolean().optional(),
  skills: joi.array().optional(),
  type: joi
    .string()
    .valid(...Object.values(JobTypeStatusEnum))
    .required(),
})

export const getJobByIdSchema = joi.object().keys({
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
})
