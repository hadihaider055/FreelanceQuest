import { DataTypes, Model } from 'sequelize'
import Message from './Message'

// Database
import { db } from '../config/db'

class Chat extends Model {
  public id!: number
  public name: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Chats',
    sequelize: db,
  }
)

Chat.hasMany(Message, { foreignKey: 'chatId' })

export default Chat
