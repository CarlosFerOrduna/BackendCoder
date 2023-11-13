import { cartModel } from './models/carts.model.js'
import { productModel } from './models/products.model.js'

export default class Carts {
    createCart = async () => {
        try {
            return await cartModel.create({})
        } catch (error) {
            throw new Error('createCart: ' + error)
        }
    }

    getCartById = async (cid) => {
        try {
            const result = await cartModel.findById(cid).populate('products.product')
            if (!result) throw new Error('cart does not exist')

            return result
        } catch (error) {
            throw new Error('getCartById: ' + error)
        }
    }

    addProductInCart = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) throw new Error('cart does not exist')

            const product = await productModel.findById(pid)
            if (!product) throw new Error('Product does not exist')

            const existsProduct = cart.products.findIndex(
                (p) => p.product && p.product.toString() === pid.toString()
            )

            if (existsProduct !== -1) cart.products[existsProduct].quantity += 1
            else cart.products.push({ product: pid, quantity: 1 })

            return await cart.save()
        } catch (error) {
            throw new Error('addProductInCart: ' + error)
        }
    }

    updateQuantityById = async (cid, pid, quantity) => {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) throw new Error('cart does not exists')

            const product = await productModel.findById(pid)
            if (!product) throw new Error('product does not exists')

            const result = await cartModel.updateOne(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } }
            )
            if (result.modifiedCount < 1) throw new Error('Product not modified')

            return await cartModel.findById(cid)
        } catch (error) {
            throw new Error('updateQuantityById: ' + error)
        }
    }

    addProductsInCart = async (cid, products) => {
        try {
            const cart = cartModel.findById(cid)
            if (!cart) throw new Error('cart does not exist')

            products.forEach(async (p) => {
                const aux = await productModel.findById(p._id)
                if (!aux) throw new Error('products not exists: ' + p._id)
            })

            return await cartModel.findByIdAndUpdate(cid, {
                $set: { products }
            })
        } catch (error) {
            throw new Error('addProductsInCart: ' + error)
        }
    }

    removeProductInCart = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) throw new Error('cart does not exist')

            const product = await productModel.findById(pid)
            if (!product) throw new Error('product does not exists')

            return await cartModel.findByIdAndUpdate(cid, {
                $pull: { products: { product: pid } }
            })
        } catch (error) {
            throw new Error('removeProductInCart: ' + error)
        }
    }

    removeAllProductsInCart = async (cid) => {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) throw new Error('cart does not exist')

            return await cartModel.findByIdAndUpdate(cid, {
                $set: { products: [] }
            })
        } catch (error) {
            throw new Error('removeProductInCart: ' + error)
        }
    }
}
