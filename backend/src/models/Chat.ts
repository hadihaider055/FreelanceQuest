import { DataTypes, Model } from 'sequelize'
import Message from './Message'
import { db } from '../config/db'

class Chat extends Model {
  public id!: number
  public name: string

  public readonly createdAt!: Date
}

Chat.hasMany(Message, {foreignKey: 'chatId'})

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'chats',
    sequelize: db,
  }
)
export default Chat
