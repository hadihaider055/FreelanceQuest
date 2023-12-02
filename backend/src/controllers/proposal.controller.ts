import { AxiosError } from 'axios'
import httpStatus from 'http-status'

// Model
import Proposal from '../models/Proposal'
import Job from '../models/Job'

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
