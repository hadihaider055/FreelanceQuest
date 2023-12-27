import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'

// Models
import Message from './Message'
import ChatMember from './ChatMember'
import User from './User'

// Types
import { Models } from '../types/model'

class Chat extends Model {
  public id!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: Models) {
    Chat.hasMany(Message, { foreignKey: 'chat_id' })
    Chat.belongsToMany(User, { through: ChatMember, foreignKey: 'chat_id' })
  }
}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    tableName: 'chats',
    sequelize: db,
  }
)

export default Chat
