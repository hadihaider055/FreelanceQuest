import { RequestHandler } from 'express'

// http-status
import httpStatus from 'http-status'

// JWT
import jwt from 'jsonwebtoken'
import User from '../models/User'

/**
 * @name auth-middleware
 * @param {string} [token]
 */

interface JwtPayload {
  id: string
  email: string
}

const authMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      const sessionMode = req.headers['session-mode']?.toString()?.toLowerCase()

      if (!token) {
        throw new Error('Token is required for authentication')
      }

      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET || 'freelance-platform-secret'
      ) as JwtPayload

      if (!decode) {
        throw new Error('Invalid token.')
      }

      const isExist = await User.findOne({
        where: {
          id: decode?.id as string,
        },
      })

      if (!isExist) {
        throw new Error('Invalid token.')
      }

      next()
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: e.message || 'Failed to authenticate',
        payload: {},
      })
    }
  }
}

export { authMiddleware }
