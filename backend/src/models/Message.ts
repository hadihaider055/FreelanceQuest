import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'

// Types
import { Models } from '../types/model'

class Message extends Model {
  public id!: number
  public content: string

  public readonly createdAt!: Date

  static associate(models: Models) {
    Message.belongsTo(models.Chat, { foreignKey: 'chat_id' })
    Message.belongsTo(models.User, { foreignKey: 'user_id' })  
  }

}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    }, // user id should be changed to sender_id (not doing it rn cz itll mess up the data)
    chat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chats',
        key: 'id',
      },
    },
  },
  {
    tableName: 'messages',
    sequelize: db,
  }
)

export default Message
