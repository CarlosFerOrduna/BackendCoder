import { Router } from 'express';
import productController from '../controllers/products.controller.js';
import productService from '../services/products.service.js';

const router = Router();

router.get('/:pid', productController.getProductByIdForViews);

router.get('/', productController.getProductsForViews);

router.get('/realtimeproducts', async (req, res) => {
    const products = await productService.getProducts();

    return res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products: products.reverse()
    });
});

export default router;
