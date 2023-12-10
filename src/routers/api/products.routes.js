import productController from '../../controllers/products.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterProducts extends BaseRouter {
    init() {
        this.get('/mockingproducts', ['user'], productController.getProductsMocks)
        this.get('/:pid', ['user'], productController.getProductById)
        this.get('/', ['user'], productController.getProductsApi)
        this.post('/', ['admin'], productController.addProduct)
        this.put('/:pid', ['admin'], productController.updateProduct)
        this.delete('/:pid', ['admin'], productController.deleteProduct)
    }
}
