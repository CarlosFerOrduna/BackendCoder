import ApiRouterCarts from './api/cart.routes.js'
import ApiRouterProducts from './api/products.routes.js'
import ApiRouterUsers from './api/user.routes.js'
import ViewsRouterCarts from './views/carts.routes.js'
import ViewsRouterChats from './views/chat.routes.js'
import ViewsRouterProducts from './views/products.routes.js'
import ViewsRouterUsers from './views/user.routes.js'

// api
const apiRoutercarts = new ApiRouterCarts().getRouter()
const apiRouterProducts = new ApiRouterProducts().getRouter()
const apiRouterUsers = new ApiRouterUsers().getRouter()

// views
const viewsRouterCarts = new ViewsRouterCarts().getRouter()
const viewsRouterChats = new ViewsRouterChats().getRouter()
const viewsRouterProducts = new ViewsRouterProducts().getRouter()
const viewsRouterUsers = new ViewsRouterUsers().getRouter()

export {
    apiRoutercarts,
    apiRouterProducts,
    apiRouterUsers,
    viewsRouterCarts,
    viewsRouterChats,
    viewsRouterProducts,
    viewsRouterUsers
}
