import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';

const router = Router();

router.get('/:cid', cartController.getCartById);
router.post('/:cid/products/:pid', cartController.addProductInCart);
router.post('/', cartController.createCart);
router.put('/:cid/products/:pid', cartController.updateQuantityById);
router.put('/:cid', cartController.AddProductsInCart);
router.delete('/:cid/products/:pid', cartController.removeProductInCart);
router.delete('/:cid', cartController.removeAllProductsInCart);

export default router;
