import { DataTypes, Sequelize } from 'sequelize'

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost'
const POSTGRES_USER = process.env.POSTGRES_USER || 'root'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || ''
const POSTGRES_DATABASE = process.env.POSTGRES_DB || 'Freelancing Platform'
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432

export const db = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  port: Number(POSTGRES_PORT),
})

const sqlConnection = async () => {
  try {
    const connect = await db.authenticate() // Use authenticate() to check the connection
    console.log(`POSTGRES db: ${POSTGRES_DATABASE}  connected successfully`)
    // we can use migrations later, for now sync seems fine since we don't have any crucial data
    // TODO(FIX): This deletes the tables whenever server restarts, fix this later :(
    await db.sync({ force: false })
    return connect
  } catch (error) {
    console.error('POSTGRES connection error', error)
  }
}

export default sqlConnection
