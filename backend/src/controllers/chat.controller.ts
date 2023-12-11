// @ts-nocheck

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'
import { Op } from 'sequelize'

// Model
import Chat from '../models/Chat'
import Message from '../models/Message'
import ChatMember from '../models/ChatMember'


const connections = new Map()

export const chatSignalingController = async (ws, req) => {
    const route = req.path
    connections.set(route, ws)
    m = Message.findAll()

    ws.on('message', message => {
      message = JSON.parse(message)
      const receiver_id = message['receiver_id'];
      const data = message.data
      let receiver_connection = connections.get(`/signaling/${receiver_id}/.websocket`)
      // if (receiver_connection == undefined) {
      //   ws.send(JSON.stringify({"error": "user is not online"}))
      // }
      receiver_connection.send(JSON.stringify(data))
    })

}

export const createChatController = generateController(
  async (req, res, raiseException) => {
    try {
      const { client_id, freelancer_id } = req.body
      const chat = await Chat.create();
      await ChatMember.create({ chat_id: chat.id, member_id: client_id})
      await ChatMember.create({ chat_id: chat.id, member_id: freelancer_id})

      return {
        message: 'Chat created successfully',
        payload: {
          chat,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to create chat'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)

export const getChatsByUserId = generateController(
  async (req, res, raiseException) => {
    try {
      const { user_id } = req.params

      const chats = await ChatMember.findAll({
        where: {
          member_id: user_id ,
        },
      })

      return {
        message: 'Chats fetched successfully',
        payload: {
          chats,
        },
      }
    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to fetch chats'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)

export const getChatById = generateController(
  async (req, res, raiseException) => {
    try {
      const { id } = req.params

      const chat = await Chat.findByPk(id)

      return {
        message: 'Chat fetched successfully',
        payload: {
          chat,
        },
      }

    } catch (e) {
      ErrorLogger.write(e)
      const axiosError: AxiosError = e

      let errorMessage = 'Failed to fetch chat'
      if (e.message) {
        errorMessage = e.message
      }

      raiseException(httpStatus.BAD_REQUEST, e.message)
    }
  }
)
