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
      const { title, description, posted_by, price, location, category } =
        req.body

      const job = await Job.create({
        title,
        description,
        posted_by,
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

export const getAllJobsController = generateController(
  async (req, res, raiseException) => {
    try {
      const jobs = await Job.findAll({})

      return {
        message: 'Jobs fetched successfully',
        payload: {
          jobs,
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

export const getJobById = generateController(
  async (req, res, raiseException) => {
    try {
      const { id } = req.params

      const job = await Job.findOne({
        where: {
          id,
        },
      })

      console.log(job)

      return {
        message: 'Job fetched successfully',
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
