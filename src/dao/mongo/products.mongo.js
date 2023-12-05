import CustomError from '../../services/errors/CostumError.js'
import errorCodes from '../../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../../services/errors/info.errors.js'
import { productModel } from './models/products.model.js'

export default class Products {
    addProduct = async (product) => {
        const newProduct = new productModel(product)

        await newProduct.validate()

        return await newProduct.save()
    }

    getProducts = async (limit, sort, page, query) => {
        return await productModel.paginate(query, {
            limit: limit ?? 6,
            page: page ?? 1,
            sort: { price: sort }
        })
    }

    getProductById = async (pid) => {
        const product = await productModel.findById(pid)
        if (!product) {
            CustomError.createError({
                name: 'product does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product
                }),
                message: 'Error to get product',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return product
    }

    updateProduct = async (pid, productUpdated) => {
        const product = await productModel.findByIdAndUpdate(pid, productUpdated, {
            new: true
        })
        if (!product) {
            CustomError.createError({
                name: 'product does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product
                }),
                message: 'Error to upadte product',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return product
    }

    deleteProduct = async (pid) => {
        const deletedProduct = await productModel.findByIdAndDelete(pid)
        if (!deletedProduct) {
            CustomError.createError({
                name: 'product does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'deletedProduct',
                    type: 'string',
                    value: deletedProduct
                }),
                message: 'Error to upadte product',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return deletedProduct
    }
}
