import { Router } from 'express'

import ViewsRouterCarts from './carts.routes.js'
import ViewsRouterChats from './chat.routes.js'
import ViewsRouterProducts from './products.routes.js'
import ViewsRouterTickets from './tickets.routes.js'
import ViewsRouterUsers from './user.routes.js'

const router = Router()

router.use('/carts', new ViewsRouterCarts().getRouter())
router.use('/chat', new ViewsRouterChats().getRouter())
router.use('/products', new ViewsRouterProducts().getRouter())
router.use('/tickets', new ViewsRouterTickets().getRouter())
router.use('/users', new ViewsRouterUsers().getRouter())

export default router
