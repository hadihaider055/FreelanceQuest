import joi from 'joi'

// Type
import { JobTypeStatusEnum } from '../models/Job'

export const createJobPostSchema = joi.object().keys({
  title: joi.string().required(),
  description: joi.string().required().min(10),
  posted_by: joi.string().required(),
  price: joi.number().required(),
  location: joi.string().required(),
  category: joi.string().valid(...Object.values(JobTypeStatusEnum)),
})
