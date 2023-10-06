import { productModel } from '../dao/models/products.model.js'

export default class ProductService {
    addProduct = async (product) => {
        try {
            const newProduct = new productModel(product)

            await newProduct.validate()

            return await newProduct.save()
        } catch (error) {
            throw new Error('addProduct: ' + error)
        }
    }

    getProducts = async (limit, sort, page, query) => {
        try {
            return productModel.paginate(query, {
                limit: limit ?? 6,
                page: page ?? 1,
                sort: { price: sort }
            })
        } catch (error) {
            throw new Error('getProducts: ' + error)
        }
    }

    getProductById = async (id) => {
        try {
            const product = await productModel.findById(id)
            if (!product) {
                throw new Error('The product does not exist')
            }

            return product
        } catch (error) {
            throw new Error('getProductById: ' + error)
        }
    }
    updateProduct = async (pid, product) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(pid, product, {
                new: true
            })
            if (!updatedProduct) {
                throw new Error('The product does not exist')
            }

            return updatedProduct
        } catch (error) {
            throw new Error('updateProduct: ' + error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id)
            if (!deletedProduct) {
                throw new Error('The product does not exist')
            }

            return deletedProduct
        } catch (error) {
            throw new Error('deleteProduct: ' + error)
        }
    }
}
