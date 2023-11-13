import { productService } from '../repositories/index.js'

class ProductController {
    constructor() {
        this.productService = productService
    }

    addProduct = async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category } = req.body
            const thumbnails = req?.file?.filename
            if (!title || !isNaN(title)) throw new Error('title is not valid')
            if (!description || !isNaN(description))
                throw new Error('description is not valid')
            if (!code || !isNaN(code)) throw new Error('code is not valid')
            if (!price || isNaN(price)) throw new Error('price is not valid')
            if (!stock || isNaN(stock)) throw new Error('stock is not valid')
            if (!category || !isNaN(category)) throw new Error('category is not valid')

            const result = await this.productService.addProduct({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            })

            return res.status(201).json({
                status: 'success',
                message: 'product created with success',
                data: result
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    getProducts = async (req, res) => {
        try {
            const { limit, page, sort, status, category } = req.query
            const sortCase = { asc: 1, desc: -1 }

            let query = {}
            if (status) query.status = status
            if (category) query.category = category

            const result = await this.productService.getProducts(
                limit,
                sortCase[sort],
                page,
                query
            )

            return res.status(200).json({
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: `http://localhost:8080/api/products/?page=${result.prevPage}`,
                nextLink: `http://localhost:8080/api/products/?page=${result.nextPage}`
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params
            if (!pid || !isNaN(pid)) throw new Error('pid is not valid')

            const product = await this.productService.getProductById(pid)

            return res.status(200).json({
                status: 'success',
                message: 'Product found successful',
                data: product
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category } = req.body
            const { pid } = req.params
            if (!pid || isNaN(pid)) throw new Error('pid is not valid')

            const thumbnails = req?.file?.filename
            const product = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }

            const update = {}

            if (product?.title && isNaN(product?.title)) update.title = product?.title
            if (product?.description && isNaN(product?.description))
                update.description = product?.description
            if (product?.code && isNaN(product?.code)) update.code = product?.code
            if (product?.price && !isNaN(product?.price)) update.price = product?.price
            if (product?.status && isNaN(product?.status)) update.status = product?.status
            if (product?.stock && !isNaN(product?.stock)) update.stock = product?.stock
            if (product?.category && isNaN(product?.category))
                update.category = product?.category
            if (product?.thumbnails && isNaN(product?.thumbnails))
                update.$push = { thumbnails: product.thumbnails }

            const data = await this.productService.updateProduct(pid, update)

            return res.status(200).json({
                status: 'success',
                message: 'product updated with success',
                data
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            if (!pid || isNaN(pid)) throw new Error('pid is not valid')

            await this.productService.deleteProduct(pid)

            return res.status(204).send({})
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    getProductsForViews = async (req, res) => {
        try {
            const { limit, page, sort, status, category } = req.query
            const sortCase = { asc: 1, desc: -1 }

            let query = {}
            if (status) query.status = status
            if (category) query.category = category

            const result = await this.productService.getProducts(
                limit,
                sortCase[sort],
                page,
                query
            )

            return res.render('products', {
                payload: JSON.parse(JSON.stringify(result.docs)),
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: `http://localhost:8080/views/products/?page=${result.prevPage}`,
                nextLink: `http://localhost:8080/views/products/?page=${result.nextPage}`,
                title: 'Products',
                firstName: req.session.firstName,
                userLog: req.session.firstName ? true : false
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    getProductByIdForViews = async (req, res) => {
        try {
            const { pid } = req.params
            if (!pid || !isNaN(pid)) throw new Error('pid is not valid')

            const product = await this.productService.getProductById(pid)

            return res.render('product', {
                product: JSON.parse(JSON.stringify(product)),
                title: `Product: ${product.title}`
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    #returnError = (res, error) => {
        return res.status(400).json({
            status: 'error',
            message: error.message,
            data: {}
        })
    }
}

const productController = new ProductController()

export default productController
