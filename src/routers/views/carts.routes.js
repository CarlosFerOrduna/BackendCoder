import cartController from '../../controllers/carts.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterCarts extends BaseRouter {
    init() {
        this.get('/userlogged/:pid', ['user'], cartController.addProductInCartUserLogged)
        this.get('/userlogged', ['user'], cartController.getCartOfLoggedUserViews)
        this.get('/:cid', ['user'], cartController.getViewCartById)
    }
}
