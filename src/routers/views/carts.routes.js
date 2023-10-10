import cartController from '../../controllers/carts.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterCarts extends BaseRouter {
    init() {
        this.get('/:cid', ['user'], cartController.getViewCartById)
    }
}
