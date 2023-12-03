import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// Model
import Proposal from '../models/Proposal'
import Job from '../models/Job'
import User from '../models/User'

// Utils
import ErrorLogger from '../services/ErrorLogger'
import { generateController } from '../utils/generateController'

export const createProposalController = generateController(
  async (req, res, raiseException) => {
    const { job_id, cover_letter, proposed_price, user_id } = req.body
    try {
      const jobExist = await Job.findOne({
        where: {
          id: job_id,
        },
      })

      if (!jobExist) {
        raiseException(httpStatus.BAD_REQUEST, 'Job does not exist')
      }

      const isSubmitted = await Proposal.findOne({
        where: {
          job_id,
          user_id,
        },
      })

      if (isSubmitted) {
        raiseException(httpStatus.BAD_REQUEST, 'Proposal already submitted')
      }

      const proposal = await Proposal.create({
        job_id,
        cover_letter,
        proposed_price,
        user_id,
      })

      return {
        message: 'Proposal submitted successfully',
        payload: {
          proposal,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to submit proposal'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)

export const getAllProposalsController = generateController(
  async (req, res, raiseException) => {
    try {
      const { userId, jobId } = req.query

      if (!userId && !jobId) {
        raiseException(httpStatus.BAD_REQUEST, 'User or Job id is required')
      }

      let proposals = []

      if (jobId) {
        const job = await Job.findOne({
          where: {
            id: jobId,
          },
        })

        if (!job) {
          raiseException(httpStatus.BAD_REQUEST, 'Job does not exist')
        }
      }

      if (userId) {
        const user = await User.findOne({
          where: {
            id: userId,
          },
        })

        if (!user) {
          raiseException(httpStatus.BAD_REQUEST, 'User does not exist')
        }
      }

      if (userId && jobId) {
        proposals = await Proposal.findAll({
          where: {
            user_id: userId,
            job_id: jobId,
          },
        })
      } else if (userId) {
        proposals = await Proposal.findAll({
          where: {
            user_id: userId,
          },
        })
      } else {
        proposals = await Proposal.findAll({
          where: {
            job_id: jobId,
          },
        })
      }

      return {
        message: 'Proposals fetched successfully',
        payload: {
          proposals,
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

export const getProposalByIdController = generateController(
  async (req, res, raiseException) => {
    try {
      const { proposalId } = req.params

      const proposal = await Proposal.findOne({
        where: {
          id: proposalId,
        },
        include: [
          { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Job, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        ],
      })

      if (!proposal) {
        raiseException(httpStatus.BAD_REQUEST, 'Proposal does not exist')
      }

      return {
        message: 'Proposal fetched successfully',
        payload: {
          proposal,
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
