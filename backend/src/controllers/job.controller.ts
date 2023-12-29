import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// Model
import Job from '../models/Job'
import User from '../models/User'
import Proposal from '../models/Proposal'

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'
import { db } from '../config/db'
import { QueryTypes } from 'sequelize'

export const createJobController = generateController(
  async (req, res, raiseException) => {
    try {
      const {
        title,
        description,
        posted_by,
        price,
        location,
        category,
        featured,
        skills,
      } = req.body

      const job = await Job.create({
        title,
        description,
        posted_by,
        price,
        location,
        category,
        featured,
        skills,
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
      const { featured } = req.query

      const query = `
        SELECT
          jobs.id,
          jobs.title,
          jobs.description,
          jobs.posted_by,
          jobs.price,
          jobs.location,
          jobs.category,
          jobs."createdAt",
          jobs."updatedAt",
          jobs.featured,
          jobs.skills,
          COUNT(DISTINCT proposals.id) AS proposalCount,
          users."firstName",
          users."lastName"
        FROM
          jobs
        LEFT JOIN
          users ON jobs.posted_by = users.id
        LEFT JOIN
          proposals ON jobs.id = proposals.job_id
        WHERE
          (:featured IS NULL OR jobs.featured = :featured)
        GROUP BY
          jobs.id, users.id
        ORDER BY
          jobs."createdAt" DESC;
      `

      const jobs = await Job.sequelize.query(query, {
        replacements: { featured: featured === 'true' ? true : null },
        type: QueryTypes.SELECT,
      })

      return {
        message: 'Jobs fetched successfully',
        payload: {
          jobs,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to fetch jobs'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, errorMessage)
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
