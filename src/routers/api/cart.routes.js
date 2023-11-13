import cartController from '../../controllers/carts.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterCarts extends BaseRouter {
    init() {
        this.get('/:cid', ['user'], cartController.getCartById)
        this.get('/:cid/purchase', ['user'], cartController.checkout)
        this.post('/:cid/products/:pid', ['user'], cartController.addProductInCart)
        this.post('/', ['user'], cartController.createCart)
        this.put('/:cid/products/:pid', ['user'], cartController.updateQuantityById)
        this.put('/:cid', ['user'], cartController.addProductsInCart)
        this.delete('/:cid/products/:pid', ['user'], cartController.removeProductInCart)
        this.delete('/:cid', ['user'], cartController.removeAllProductsInCart)
    }
}
