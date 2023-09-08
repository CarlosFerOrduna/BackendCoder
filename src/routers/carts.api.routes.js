import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';

const router = Router();

router.get('/:cid', cartController.getCartById);
router.post('/:cid/product/:pid', cartController.addProductInCart);
router.post('/', cartController.createCart);

export default router;
