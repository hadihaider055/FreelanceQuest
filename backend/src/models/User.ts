import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'

class User extends Model {
  public id!: number
  public email!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    // schema: 'UserSchema',
  }
)

export default User
