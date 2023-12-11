import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'
import Chat from './Chat'

const ChatMember = db.define('chat_members', 
  {
    chat_id: {
        type: DataTypes.UUID,
        references: {
          model: 'chats',
          key: 'id'
        }
    },
    member_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
    },
  },
)

export default ChatMember
