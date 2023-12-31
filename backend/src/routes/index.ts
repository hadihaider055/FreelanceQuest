import express, { Router } from 'express'

// Routes
import userRoutes from './user.routes'
import jobRoutes from './job.routes'
import proposalRoutes from './proposal.routes'
import chatRoutes from './chat.routes'
import messageRoutes from './message.routes'

const router = express.Router()

interface RoutesMapper {
  path: string
  router: Router
}

const routesMapper: RoutesMapper[] = [
  { path: '/user', router: userRoutes },
  { path: '/job', router: jobRoutes },
  { path: '/chat', router: chatRoutes},
  { path: '/proposal', router: proposalRoutes },
  { path: '/message', router: messageRoutes },
]

routesMapper.forEach((route) => {
  router.use(route.path, route.router)
})

export default router
