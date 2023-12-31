import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'

// Models
import User from './User'
import Proposal from './Proposal'

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
  public category: string
  public featured: boolean
  public skills?: string[]
  public type: JobTypeStatusEnum

  public readonly proposals?: Proposal[]
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: Models) {
    Job.belongsTo(models.User, { foreignKey: 'posted_by' })
    Job.hasMany(models.Proposal, { foreignKey: 'job_id', as: 'proposals' })
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      values: Object.values(JobTypeStatusEnum),
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    tableName: 'jobs',
    sequelize: db,
    //     schema: 'JobSchema',
  }
)

Job.belongsTo(User, { foreignKey: 'posted_by' })

export default Job
