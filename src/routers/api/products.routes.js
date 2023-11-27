import productController from '../../controllers/products.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterProducts extends BaseRouter {
    init() {
        this.get('/mockingproducts', ['public'], productController.getProductsMocks)
        this.get('/:pid', ['public'], productController.getProductById)
        this.get('/', ['public'], productController.getProducts)
        this.post('/', ['admin'], productController.addProduct)
        this.put('/:pid', ['admin'], productController.updateProduct)
        this.delete('/:pid', ['admin'], productController.deleteProduct)
    }
}
