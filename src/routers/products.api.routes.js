import { Router } from 'express';
import productController from '../controllers/products.controller.js';
import { uploader } from '../utils/multer.util.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.post('/', uploader.single('file'), productController.addProduct);
router.put('/:pid', uploader.single('file'), productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

export default router;
