import cors from 'cors'
import express, { ErrorRequestHandler, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import BaseRouter from './routes'

// Init express
const app = express()

/**
 * Setting up cors
 */
app.use(cors())

/**
 * Set basic express settings
 */

app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(express.urlencoded({ extended: true }))

/**
 * Show routes details in dev output in console during development
 * else, show routes details in tiny form
 */
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'))
} else {
  app.use(morgan('dev'))
}

/**
 * Helmet for basic security in production
 */
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

/**
 * Registering base API routes
 */
app.use('/api/v1', BaseRouter)

app.use('/', (req: Request, res: Response) =>
  res.status(200).send('Welcome to the backend of Freelancing Platform!')
)
/**
 * Catch API errors throughout the application
 */
app.use((req: Request, res: Response, next: any) => {
  const err: any = new Error('Not Found')
  err.status = 404
  next(err)
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({ message: 'Not found' })
  } else {
    res.status(500).json({
      success: false,
      message: 'Something looks wrong :( !!!',
      payload: { error: err.message },
    })
  }
}
app.use(errorHandler)

/**
 * Exporting express app instance
 */
export default app
