import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'
import User from './User'

// Types
import { Models } from 'model'

export enum JobTypeStatusEnum {
  HOURLY = 'HOURLY',
  FIXED_PRICE = 'FIXED_PRICE',
}

class Job extends Model {
  public id!: string
  public title: string
  public description: string
  public posted_by: string
  public price: number
  public location: string
  public category: JobTypeStatusEnum

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: Models) {
    Job.belongsTo(models.User, { foreignKey: 'posted_by' })
  }
}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    posted_by: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      values: Object.values(JobTypeStatusEnum),
    },
  },
  {
    tableName: 'jobs',
    sequelize: db,
    schema: 'JobSchema',
  }
)

Job.belongsTo(User, { foreignKey: 'posted_by' })

export default Job
