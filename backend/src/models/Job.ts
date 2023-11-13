import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'
import User from './User'

export enum JobTypeStatusEnum {
  HOURLY = 'HOURLY',
  FIXED_PRICE = 'FIXED_PRICE',
}

class Job extends Model {
  public id!: number
  public title: string
  public description: string
  public postedBy: string
  public price: number
  public location: string
  public category: JobTypeStatusEnum

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    postedBy: {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'Jobs',
    sequelize: db,
  }
)

Job.belongsTo(User, { foreignKey: 'postedBy' })

export default Job
