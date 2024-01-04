import { DataTypes, Model } from 'sequelize'

// Database
import { db } from '../config/db'
import User from './User'
import Job from './Job'

// Types
import { Models } from 'model'

export enum ProposalStatusEnum {
  ACTIVE = 'ACTIVE',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED'
}

class Proposal extends Model {
  public id!: string
  public cover_letter: string
  public proposed_price: number

  public user_id!: string
  public job_id!: string

  public status: ProposalStatusEnum

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: Models) {
    Proposal.belongsTo(models.User, { foreignKey: 'user_id' })
    Proposal.belongsTo(models.Job, { foreignKey: 'job_id' })
  }
}

Proposal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cover_letter: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    proposed_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('ACCEPTED', 'ACTIVE', 'EXPIRED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    },
  },
  {
    tableName: 'proposals',
    sequelize: db,
//     schema: 'ProposalSchema',
  }
)

Proposal.belongsTo(User, { foreignKey: 'user_id' })
Proposal.belongsTo(Job, { foreignKey: 'job_id' })

export default Proposal
