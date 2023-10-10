import productController from '../../controllers/products.controller.js'
import ProductService from '../../services/products.service.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterProducts extends BaseRouter {
    init() {
        this.get('/realtimeproducts', ['public'], async (req, res) => {
            const productService = new ProductService()
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
