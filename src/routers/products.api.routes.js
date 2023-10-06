import { Router } from 'express'
import productController from '../controllers/products.controller.js'
import { authToken } from '../utils/jwt.util.js'
import { uploader } from '../utils/multer.util.js'

const router = Router()

router.get('/', authToken, productController.getProducts)
router.get('/:pid', authToken, productController.getProductById)
router.post('/', uploader.single('file'), authToken, productController.addProduct)
router.put('/:pid', uploader.single('file'), authToken, productController.updateProduct)
router.delete('/:pid', authToken, productController.deleteProduct)

export default router
