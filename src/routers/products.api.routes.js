import { Router } from 'express';
import productController from '../controllers/products.controller.js';
import { uploader } from '../utils/multer.util.js';
import { authToken } from '../utils/jwt.util.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.post('/', uploader.single('file'), authToken, productController.addProduct);
router.put('/:pid', uploader.single('file'), authToken, productController.updateProduct);
router.delete('/:pid', authToken, productController.deleteProduct);

export default router;
