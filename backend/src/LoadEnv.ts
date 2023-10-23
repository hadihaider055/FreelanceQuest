import dotenv from 'dotenv'

const { NODE_ENV = 'dev' } = process.env

let envFilename = '.env'
if (NODE_ENV !== 'dev') {
  envFilename = `.env.${NODE_ENV}`
}

dotenv.config({
  path: `./${envFilename}`,
})
