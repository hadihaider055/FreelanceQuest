import { DataTypes, Sequelize } from 'sequelize'

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || ''
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'your_database_name'

export const db = new Sequelize({
  dialect: 'mysql',
  host: MYSQL_HOST,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
})

const sqlConnection = async () => {
  try {
    const connect = await db.authenticate() // Use authenticate() to check the connection
    console.log('MySQL connected successfully')

    return connect
  } catch (error) {
    console.error('MySQL connection error', error)
  }
}

export default sqlConnection
