import { ObjectSchema } from 'joi'
import { RequestHandler } from 'express'

export const validateParams = (schema: ObjectSchema) => {
  const middleware: RequestHandler = (request, response, next) => {
    const hasParams = typeof request.params === 'object'
    if (!hasParams) {
      return response.status(400).json({
        message: 'Params is/are required',
        succuess: false,
      })
    }

    const { error } = schema.validate(request.params)
    if (error) {
      return response.status(400).json({
        success: false,
        message: error.details?.[0]?.message,
      })
    }

    next()
  }
  return middleware
}
