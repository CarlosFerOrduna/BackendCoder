import {
    cartService,
    productService,
    ticketService,
    userService
} from '../repositories/index.js'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../services/errors/info.errors.js'

class CartController {
    createCart = async (req, res) => {
        const result = await cartService.createCart()
        const { user } = req.session
        user.cart = result._id
        await userService.updateUser(user)

        return res.status(201).send({
            status: 'success',
            message: 'cart created with success',
            data: result
        })
    }

    getCartById = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to get cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.getCartById(cid)

        return res.status(200).json({
            status: 'success',
            message: 'cart found with success',
            data: result
        })
    }

    addProductInCart = async (req, res) => {
        const { cid, pid } = req.params
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to add product in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!pid || !isNaN(pid)) {
            CustomError.createError({
                name: 'pid not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to add product in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.addProductInCart(cid, pid)

        return res.status(201).json({
            status: 'success',
            message: 'product added with success',
            data: result
        })
    }

    updateQuantityById = async (req, res) => {
        const { cid, pid } = req.params
        const { quantity } = req.body
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to update quantity in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!pid || !isNaN(pid)) {
            CustomError.createError({
                name: 'pid not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to update quantity in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!quantity || parseInt(quantity) < 0) {
            CustomError.createError({
                name: 'quantity not valid',
                cause: invalidFieldErrorInfo({
                    name: 'quantity',
                    type: 'number',
                    value: quantity
                }),
                message: 'Error to update quantity in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.updateQuantityById(cid, pid, quantity)

        return res.status(201).json({
            status: 'success',
            message: 'product added with success',
            data: result
        })
    }

    addProductsInCart = async (req, res) => {
        const { cid } = req.params
        const { products } = req.body

        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to add products in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!products || products.length < 1) {
            CustomError.createError({
                name: 'pid not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to add products in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.addProductsInCart(cid, products)

        return res.status(201).json({
            status: 'success',
            message: 'product added with success',
            data: result
        })
    }

    removeProductInCart = async (req, res) => {
        const { cid, pid } = req.params
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to delete product in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!products || products.length < 1) {
            CustomError.createError({
                name: 'pid not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to delete product in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.removeProductInCart(cid, pid)

        return res.status(200).json({
            status: 'success',
            message: 'product removed with success',
            data: result
        })
    }

    removeAllProductsInCart = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to remove all products in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.removeAllProductsInCart(cid)

        return res.status(200).json({
            status: 'success',
            message: 'all products removed with success',
            data: result
        })
    }

    getViewCartById = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to get product in cart',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await cartService.getCartById(cid)

        return res.render('cart', {
            cart: JSON.parse(JSON.stringify(result)),
            title: 'Cart'
        })
    }

    checkout = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            CustomError.createError({
                name: 'cid not valid',
                cause: invalidFieldErrorInfo({ name: 'cid', type: 'string', value: cid }),
                message: 'Error to checkout',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const cart = await cartService.getCartById(cid)
        const { products } = cart

        const productsOk = []
        const productsError = []

        const { user } = req.session
        let amount = 0
        for (const p of products) {
            const product = await productService.getProductById(p.product._id)
            if (product.stock >= p.quantity) {
                await productService.updateProduct(
                    p.product._id,
                    (product.stock -= p.product.quantity)
                )

                amount += product.price * p.quantity

                productsOk.push({
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    status: product.status,
                    stock: product.stock,
                    category: product.category,
                    thumbnails: product.thumbnails,
                    quantity: p.product.quantity,
                    amount: product.price * p.product.quantity
                })
            } else {
                productsError.push({
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    status: product.status,
                    stock: product.stock,
                    category: product.category,
                    thumbnails: product.thumbnails,
                    quantity: p.product.quantity,
                    amount: product.price * p.product.quantity
                })
            }
        }

        const result = await ticketService.createTicket({ amount, purchaser: user.email })
        user.tickets.push(result._id)
        await userService.updateUser(user)
        await cartService.removeAllProductsInCart(cid)

        return res.status(200).json({
            status: 'success',
            message: 'ticket created with success',
            data: { result, productsOk, productsError }
        })
    }
}

const cartController = new CartController()

export default cartController
