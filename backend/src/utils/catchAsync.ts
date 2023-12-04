import httpStatus from 'http-status'
import { Request, Response } from 'express'

const catchAsync =
  (fn: Function, customError: string = null) =>
  (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log('error >>', err)
      return res
        .status(HttpStatusCode.BadRequest)
        .json({ success: false, error: err?.message })
    })
  }

export default catchAsync
