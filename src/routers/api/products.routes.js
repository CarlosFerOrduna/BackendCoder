import productController from '../../controllers/products.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterProducts extends BaseRouter {
    init() {
        this.get('/mockingproducts', ['user', 'premium'], productController.getProductsMocks)
        this.get('/:pid', ['user', 'premium'], productController.getProductById)
        this.get('/', ['user', 'premium', 'admin'], productController.getProductsApi)
        this.post('/', ['admin', 'premium'], productController.addProduct)
        this.put('/:pid', ['admin', 'premium'], productController.updateProduct)
        this.delete('/:pid', ['admin', 'premium'], productController.deleteProduct)
    }
}
