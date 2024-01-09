import cartController from '../../controllers/carts.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterCarts extends BaseRouter {
    init() {
        this.get(
            '/userlogged/:pid',
            ['user', 'premium'],
            cartController.addProductInCartUserLogged
        )
        this.get('/userlogged', ['user', 'premium'], cartController.getCartOfLoggedUserViews)
        this.get('/:cid', ['user', 'premium'], cartController.getViewCartById)
    }
}
