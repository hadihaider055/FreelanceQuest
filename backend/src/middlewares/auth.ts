import { RequestHandler } from 'express'

// http-status
import httpStatus from 'http-status'

/**
 * @name auth-middleware
 * @param {string} [token]
 */

const authMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      const sessionMode = req.headers['session-mode']?.toString()?.toLowerCase()

      if (!token) {
        throw new Error('Token is required for authentication')
      }

      next()
    } catch (e) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: e.message || 'Failed to authenticate',
        payload: {},
      })
    }
  }
}

export { authMiddleware }
