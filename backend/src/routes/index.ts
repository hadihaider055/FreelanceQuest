import express, { Router } from 'express'
import userRoutes from './user.routes'

const router = express.Router()

interface RoutesMapper {
  path: string
  router: Router
}

const routesMapper: RoutesMapper[] = [{ path: '/user', router: userRoutes }]

routesMapper.forEach((route) => {
  router.use(route.path, route.router)
})

export default router
