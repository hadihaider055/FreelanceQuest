import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'

// Types
import { Models } from 'model'

class User extends Model {
  public id!: string
  public firstName!: string
  public lastName!: string
  public email!: string
  public password!: string
  public title: string
  public description: string
  public languages: string[]
  public hourlyRate: number
  public profileImage: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: Models): void {
    User.hasMany(models.Job, {
      foreignKey: 'posted_by',
      constraints: false,
      as: 'jobs',
    })
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
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
    title: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: '',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    hourlyRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    profileImage: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: '',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
