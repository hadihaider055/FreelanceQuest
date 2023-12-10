import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'

// Types
import { Models } from 'model'
import Chat from './Chat'
import ChatMember from './ChatMember'

class User extends Model {
  public id!: string
  public username!: string
  public email!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: Models): void {
    User.hasMany(models.Job, {
      foreignKey: 'posted_by',
      constraints: false,
      as: 'jobs',
    })
    User.belongsToMany(Chat, { through: ChatMember, foreignKey: 'user_id' })
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
//     schema: 'UserSchema',
  }
)

export default User
