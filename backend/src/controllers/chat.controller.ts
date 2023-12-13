// @ts-nocheck

// Utils
import { generateController } from '../utils/generateController'
import ErrorLogger from '../services/ErrorLogger'
import { Op, QueryTypes } from 'sequelize'

// Model
import Chat from '../models/Chat'
import Message from '../models/Message'
import ChatMember from '../models/ChatMember'
import { db } from '../config/db'


const connections = new Map()

export const chatSignalingController = async (ws, req) => {
    const route = req.path

    if ( !connections.get(route) ) {
      connections.set(route, ws);
    } 

    ws.on('message', message => {
      message = JSON.parse(message)
      const receiver_id = message.receiver_id;
      const data = message.data
  
      let receiver_connection = connections.get(`/signaling/${receiver_id}/.websocket`)

      if (receiver_connection) {
        ws.send(JSON.stringify({"success": "message sent to user!"}))
        receiver_connection.send(JSON.stringify(data))
      } else {
        ws.send(JSON.stringify({"error": "user is not online :("}))
      }
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

      // const chats = await ChatMember.findAll({
      //   where: {
      //     member_id: user_id,
      //   },
      // })

      const sql = `SELECT * FROM (SELECT * FROM chat_members a inner join
        ( select member_id as recipient_member_id, chat_id from chat_members where 
          member_id != '${user_id}' ) b on a.chat_id = b.chat_id WHERE 
          member_id = '${user_id}') c inner join (select id, 
          concat("firstName", ' ', "lastName") as recipient_name from users) d 
          on c.recipient_member_id = d.id`
      const chats = await db.query(sql, { type: QueryTypes.SELECT });
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
