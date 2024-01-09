import productController from '../../controllers/products.controller.js'
import { productService } from '../../repositories/index.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterProducts extends BaseRouter {
    init() {
        this.get('/realtimeproducts', ['user', 'premium'], async (req, res) => {
            const products = await productService.getProducts()

            return res.render('realTimeProducts', {
                title: 'Productos en tiempo real',
                products: products
            })
        })
        this.get(
            '/mockingproducts',
            ['user', 'premium'],
            productController.getProductsMocksForViews
        )
        this.get('/:pid', ['user', 'premium'], productController.getProductByIdForViews)
        this.get('/', ['user', 'premium'], productController.getProductsViews)
    }
}
