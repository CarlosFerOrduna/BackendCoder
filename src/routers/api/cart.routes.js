import cartController from '../../controllers/carts.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterCarts extends BaseRouter {
    init() {
        this.get('/userlogged', ['user', 'premium'], cartController.getCartOfLoggedUserApi)
        this.get('/:cid/purchase', ['user', 'premium'], cartController.checkout)
        this.get('/:cid', ['user', 'premium'], cartController.getCartById)
        this.post(
            '/:cid/products/:pid',
            ['user', 'premium', 'admin'],
            cartController.addProductInCart
        )
        this.post('/', ['user', 'premium'], cartController.createCart)
        this.put('/:cid/products/:pid', ['user', 'premium'], cartController.updateQuantityById)
        this.put('/:cid', ['user', 'premium', 'admin'], cartController.addProductsInCart)
        this.delete(
            '/:cid/products/:pid',
            ['user', 'premium'],
            cartController.removeProductInCart
        )
        this.delete('/:cid', ['user', 'premium'], cartController.removeAllProductsInCart)
    }
}
