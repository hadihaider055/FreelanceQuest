import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// Model
import Job from '../models/Job'

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'

export const createJobController = generateController(
  async (req, res, raiseException) => {
    try {
      const { title, description, postedBy, price, location, category } =
        req.body

      const job = await Job.create({
        title,
        description,
        postedBy,
        price,
        location,
        category,
      })

      return {
        message: 'Job post created successfully',
        payload: {
          job,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to create job'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)
