import { Router } from 'express'
import cartController from '../controllers/carts.controller.js'
import { authToken } from '../utils/jwt.util.js'

const router = Router()

router.get('/:cid', authToken, cartController.getCartById)
router.post('/:cid/products/:pid', authToken, cartController.addProductInCart)
router.post('/', authToken, cartController.createCart)
router.put('/:cid/products/:pid', authToken, cartController.updateQuantityById)
router.put('/:cid', authToken, cartController.addProductsInCart)
router.delete('/:cid/products/:pid', authToken, cartController.removeProductInCart)
router.delete('/:cid', authToken, cartController.removeAllProductsInCart)

export default router
