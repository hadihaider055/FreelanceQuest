import { DataTypes, Model } from 'sequelize'
import User from './User';
import { db } from '../config/db'
import Chat from './Chat';

class Message extends Model {
  public id!: number
  public content: string

  public readonly createdAt!: Date
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'Messages',
    sequelize: db,
  }
)

Message.belongsTo(User, { foreignKey: 'userId' })
Message.belongsTo(Chat, { foreignKey: 'chatId'})

export default Message
