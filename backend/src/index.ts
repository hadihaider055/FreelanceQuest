import './LoadEnv'
import app from './Server'
import mongoConnection from './config/db'

/**
 * Port at which server will run
 */
const port = Number(process.env.PORT || 8001)

/**
 * Connecting to Database
 */
mongoConnection()

/**
 * Starting the server
 * @param port Port at which server will run
 */
const server = app.listen(port, () => {
  console.log('express server started on port: ' + port)
})

/**
 * Exporting server instance
 */
export default server
