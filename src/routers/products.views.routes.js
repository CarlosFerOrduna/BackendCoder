import { Router } from 'express'
import productController from '../controllers/products.controller.js'
import ProductService from '../services/products.service.js'

const router = Router()

router.get('/realtimeproducts', async (req, res) => {
    const productService = new ProductService()
    const products = await productService.getProducts()

    return res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products: products
    })
})
router.get('/:pid', productController.getProductByIdForViews)
router.get('/', productController.getProductsForViews)

export default router
