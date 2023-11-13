import productController from '../../controllers/products.controller.js'
import { productService } from '../../repositories/index.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterProducts extends BaseRouter {
    init() {
        this.get('/realtimeproducts', ['public'], async (req, res) => {
            const products = await productService.getProducts()

            return res.render('realTimeProducts', {
                title: 'Productos en tiempo real',
                products: products
            })
        })
        this.get('/:pid', ['user'], productController.getProductByIdForViews)
        this.get('/', ['user'], productController.getProductsForViews)
    }
}
