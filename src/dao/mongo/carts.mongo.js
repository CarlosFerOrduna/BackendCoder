import CustomError from '../../services/errors/CostumError.js'
import errorCodes from '../../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../../services/errors/info.errors.js'
import { cartModel } from './models/carts.model.js'
import { productModel } from './models/products.model.js'

export default class Carts {
    createCart = async () => {
        return await cartModel.create({})
    }

    getCartById = async (cid) => {
        const result = await cartModel.findById(cid).populate('products.product')
        if (!result) {
            CustomError.createError({
                name: 'cart does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'result',
                    type: 'string',
                    value: result
                }),
                message: 'Error to get cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return result
    }

    addProductInCart = async (cid, pid) => {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            CustomError.createError({
                name: 'cart does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'cart',
                    type: 'string',
                    value: cart
                }),
                message: 'Error to add product in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        const product = await productModel.findById(pid)
        if (!product) {
            CustomError.createError({
                name: 'Product does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product
                }),
                message: 'Error to add product in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        const existsProduct = cart.products.findIndex(
            (p) => p.product && p.product.toString() === pid.toString()
        )

        if (existsProduct !== -1) cart.products[existsProduct].quantity += 1
        else cart.products.push({ product: pid, quantity: 1 })

        return await cart.save()
    }

    updateQuantityById = async (cid, pid, quantity) => {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            CustomError.createError({
                name: 'cart does not exists',
                cause: invalidFieldErrorInfo({
                    name: 'cart',
                    type: 'string',
                    value: cart
                }),
                message: 'Error to update quantity in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        const product = await productModel.findById(pid)
        if (!product) {
            CustomError.createError({
                name: 'product does not exists',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product
                }),
                message: 'Error to update quantity in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }
        const result = await cartModel.updateOne(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': quantity } }
        )
        if (result.modifiedCount < 1) {
            CustomError.createError({
                name: 'Product not modified',
                cause: invalidFieldErrorInfo({
                    name: 'result',
                    type: 'string',
                    value: result
                }),
                message: 'Error to get cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return await cartModel.findById(cid)
    }

    addProductsInCart = async (cid, products) => {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            CustomError.createError({
                name: 'cart does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'cart',
                    type: 'string',
                    value: cart
                }),
                message: 'Error to add products in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        for (const p of products) {
            const { _id } = p
            const aux = await productModel.findById(_id)

            if (!aux) {
                CustomError.createError({
                    name: 'aux not exists: ' + _id,
                    cause: invalidFieldErrorInfo({
                        name: 'aux',
                        type: 'string',
                        value: aux
                    }),
                    message: 'Error to add products in cart',
                    code: errorCodes.DATABASE_ERROR
                })
            }
        }

        return await cartModel.findByIdAndUpdate(cid, {
            $set: { products }
        })
    }

    removeProductInCart = async (cid, pid) => {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            CustomError.createError({
                name: 'cart does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'cart',
                    type: 'string',
                    value: cart
                }),
                message: 'Error to remove product in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }
        const product = await productModel.findById(pid)
        if (!product) {
            CustomError.createError({
                name: 'product does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product
                }),
                message: 'Error to remove product in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return await cartModel.findByIdAndUpdate(cid, {
            $pull: { products: { product: pid } }
        })
    }

    removeAllProductsInCart = async (cid) => {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            CustomError.createError({
                name: 'cart does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'cart',
                    type: 'string',
                    value: cart
                }),
                message: 'Error to remove all products in cart',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return await cartModel.findByIdAndUpdate(cid, {
            $set: { products: [] }
        })
    }
}
