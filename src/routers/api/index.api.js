import { Router } from 'express'
import ApiRouterCarts from './cart.routes.js'
import ApiRouterProducts from './products.routes.js'
import ApiRouterUsers from './user.routes.js'
import ApiRouterTickets from './tickets.routes.js'

const router = Router()

router.use('/products', new ApiRouterProducts().getRouter())
router.use('/carts', new ApiRouterCarts().getRouter())
router.use('/tickets', new ApiRouterTickets().getRouter())
router.use('/users', new ApiRouterUsers().getRouter())

export default router
