import {
    cartService,
    productService,
    ticketService,
    userService
} from '../repositories/index.js'

class CartController {
    constructor() {
        this.cartService = cartService
    }

    createCart = async (req, res) => {
        try {
            const result = await this.cartService.createCart()
            const { user } = req.session
            user.cart = result._id
            await userService.updateUser(user)

            return res.status(201).send({
                status: 'success',
                message: 'cart created with success',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
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
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
        }
    }

    checkout = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is not valid')

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
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            })
        }
    }
}

const cartController = new CartController()

export default cartController
