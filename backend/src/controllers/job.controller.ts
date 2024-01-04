import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// Model
import Job from '../models/Job'
import User, { UserRoleEnum } from '../models/User'
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
        category,
        featured,
        skills,
        type,
      } = req.body

      const user = await User.findOne({
        where: {
          id: posted_by,
        },
      })

      if (!user) {
        raiseException(400, 'User not found')
      }

      if (user.role !== UserRoleEnum.CLIENT) {
        raiseException(400, 'Only clients can post jobs')
      }

      const job = await Job.create({
        title,
        description,
        posted_by,
        price,
        category,
        featured,
        skills,
        type,
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

      raiseException(400, e.message)
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
          jobs.category,
          jobs."createdAt",
          jobs."updatedAt",
          jobs.featured,
          jobs.skills,
          jobs.type,
          COUNT(DISTINCT proposals.id) AS proposalCount,
          users."firstName",
          users."lastName",
          users.address
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

      const replacements = {
        featured:
          featured === 'true' ? true : featured === 'false' ? false : null,
      }

      const jobs = await Job.sequelize.query(query, {
        replacements,
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

      raiseException(400, errorMessage)
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

      raiseException(400, e.message)
    }
  }
)

export const getUserJobFeedController = generateController(
  async (req, res, raiseException) => {
    try {
      const { id } = req.params

      const user = await User.findOne({
        where: {
          id,
        },
      })

      if (!user) {
        raiseException(400, 'User not found')
      }

      let jobs = []

      if (user.role === UserRoleEnum.FREELANCER) {
        const query = `
        SELECT
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.posted_by,
        jobs.price,
        jobs.category,
        jobs."createdAt",
        jobs."updatedAt",
        jobs.featured,
        jobs.skills,
        jobs.type,
        COUNT(DISTINCT proposals.id) AS proposalCount,
        users."firstName",
        users."lastName",
        users.address
        FROM
        jobs
        LEFT JOIN
        users ON jobs.posted_by = users.id
        LEFT JOIN
        proposals ON jobs.id = proposals.job_id
        WHERE
        (jobs.category = :userCategory OR :userCategory IS NULL)
        GROUP BY
        jobs.id, users.id
        ORDER BY
        jobs."createdAt" DESC;
        `

        const replacements = {
          userCategory: user.category,
        }

        jobs = await Job.sequelize.query(query, {
          replacements,
          type: QueryTypes.SELECT,
        })
      } else {
        const query = `
        SELECT
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.posted_by,
        jobs.price,
        jobs.category,
        jobs."createdAt",
        jobs."updatedAt",
        jobs.featured,
        jobs.skills,
        jobs.type,
        COUNT(DISTINCT proposals.id) AS proposalCount,
        users."firstName",
        users."lastName",
        users.address
        FROM
        jobs
        LEFT JOIN
        users ON jobs.posted_by = users.id
        LEFT JOIN
        proposals ON jobs.id = proposals.job_id
        GROUP BY
        jobs.id, users.id
        ORDER BY
        jobs."createdAt" DESC;
        `

        const replacements = {
          userCategory: user.category,
        }

        jobs = await Job.sequelize.query(query, {
          replacements,
          type: QueryTypes.SELECT,
        })
      }

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

      raiseException(400, errorMessage)
    }
  }
)
