import { cartService } from '../repositories/index.js'

class CartController {
    constructor() {
        this.cartService = cartService
    }

    createCart = async (req, res) => {
        try {
            const result = await this.cartService.createCart()

            return res.status(201).send({
                status: 'success',
                message: 'cart created with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    getCartById = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid not valid')

            const result = await this.cartService.getCartById(cid)

            return res.status(200).json({
                status: 'success',
                message: 'cart found with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    addProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is not valid')
            if (!pid || !isNaN(pid)) throw new Error('pid is not valid')

            const result = await this.cartService.addProductInCart(cid, pid)

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    updateQuantityById = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            if (!cid || !isNaN(cid)) throw new Error('cid is not valid')
            if (!pid || !isNaN(pid)) throw new Error('pid is not valid')
            if (!quantity || parseInt(quantity) < 0) throw new Error('quantity is not valid')

            const result = await this.cartService.updateQuantityById(cid, pid, quantity)

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    addProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is not valid')
            const { products } = req.body
            if (!products || products.length < 1) throw new Error('products is not valid')

            const result = await this.cartService.addProductsInCart(cid, products)

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    removeProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is not valid')
            if (!pid || !isNaN(pid)) throw new Error('pid is not valid')

            const result = await this.cartService.removeProductInCart(cid, pid)

            return res.status(200).json({
                status: 'success',
                message: 'product removed with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    removeAllProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is not valid')

            const result = await this.cartService.removeAllProductsInCart(cid)

            return res.status(200).json({
                status: 'success',
                message: 'all products removed with success',
                data: result
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    getViewCartById = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid not valid')

            const result = await this.cartService.getCartById(cid)

            return res.render('cart', {
                cart: JSON.parse(JSON.stringify(result)),
                title: 'Cart'
            })
        } catch (error) {
            return this.#returnError()
        }
    }

    #returnError = (error) => {
        return res.status(400).json({
            status: 'error',
            message: error.message,
            data: []
        })
    }
}

const cartController = new CartController()

export default cartController
