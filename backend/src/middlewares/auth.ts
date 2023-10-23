import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

const { JWT_SECRET = '' } = process.env

/**
 * @name auth-middleware
 * @param {string} [token]
 */

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header('Authorization')
    token = token?.replace('Bearer ', '')

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET)
    }

    return next()
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      error: error.message || 'Token is not valid',
    })
  }
}

export { authMiddleware }
