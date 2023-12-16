import { productService } from '../repositories/index.js'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'
import {
    createProductErrorInfo,
    invalidFieldErrorInfo
} from '../services/errors/info.errors.js'
import { generateProductMock } from '../utils/faker.util.js'

class ProductController {
    addProduct = async (req, res) => {
        const { user } = req.session || req.session.user
        const { title, description, code, price, status, stock, category } = req.body
        const owner = user?.email
        const thumbnails = req?.file?.filename

        if (
            !title ||
            !isNaN(title) ||
            !description ||
            !isNaN(description) ||
            !code ||
            !isNaN(code) ||
            !price ||
            isNaN(price) ||
            !stock ||
            isNaN(stock) ||
            !category ||
            !isNaN(category)
        ) {
            CustomError.createError({
                name: 'Invalid types',
                cause: createProductErrorInfo({
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnails,
                    owner
                }),
                message: 'Error to create product',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await productService.addProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
            owner
        })

        return res.status(201).json({
            status: 'success',
            message: 'product created with success',
            data: result
        })
    }

    #getProducts = async (req, res) => {
        const { limit, page, sort, status, category } = req.query
        const sortCase = { asc: 1, desc: -1 }

        let query = {}
        if (status) query.status = status
        if (category) query.category = category

        const result = await productService.getProducts(limit, sortCase[sort], page, query)

        return { result }
    }

    getProductById = async (req, res) => {
        const { pid } = req.params
        if (!pid || !isNaN(pid)) {
            CustomError.createError({
                name: 'pid is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to get product',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const product = await productService.getProductById(pid)

        return res.status(200).json({
            status: 'success',
            message: 'Product found successful',
            data: product
        })
    }

    updateProduct = async (req, res) => {
        const { user } = req.session || req.session.user
        const { title, description, code, price, status, stock, category } = req.body
        const { pid } = req.params

        if (!pid || !isNaN(pid)) {
            CustomError.createError({
                name: 'pid is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to update product',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const prod = await productService.getProductById(pid)
        if (prod?.owner !== user?.email && user?.rol === 'premium') {
            CustomError.createError({
                name: 'forbidden',
                cause: 'this is not your product',
                message: 'error to update product',
                code: errorCodes.USER_FORBIDDEN
            })
        }

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
        if (product?.category && isNaN(product?.category)) update.category = product?.category
        if (product?.thumbnails && isNaN(product?.thumbnails))
            update.$push = { thumbnails: product.thumbnails }

        const data = await productService.updateProduct(pid, update)

        return res.status(200).json({
            status: 'success',
            message: 'product updated with success',
            data
        })
    }

    deleteProduct = async (req, res) => {
        const { user } = req.user || req.session

        const { pid } = req.params
        if (!pid || !isNaN(pid)) {
            CustomError.createError({
                name: 'pid is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to delete product',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        const product = await productService.getProductById(pid)
        if (product.owner !== user.email && user.rol === 'premium') {
            CustomError.createError({
                name: 'forbidden',
                cause: 'this is not your product',
                message: 'error to delete product',
                code: errorCodes.USER_FORBIDDEN
            })
        }

        await productService.deleteProduct(pid)

        return res.status(204).send({})
    }

    getProductsApi = async (req, res) => {
        const { result } = await this.#getProducts(req, res)

        return res.status(200).json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: `/api/products/?page=${result.prevPage}`,
            nextLink: `/api/products/?page=${result.nextPage}`
        })
    }

    getProductsViews = async (req, res) => {
        const { result } = await this.#getProducts(req, res)

        return res.render('products', {
            payload: JSON.parse(JSON.stringify(result.docs)),
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: `/views/products/?page=${result.prevPage}`,
            nextLink: `/views/products/?page=${result.nextPage}`,
            title: 'Products',
            firstName: req.session.firstName,
            userLog: req.session.firstName ? true : false
        })
    }

    getProductByIdForViews = async (req, res) => {
        const { pid } = req.params
        if (!pid || !isNaN(pid)) {
            CustomError.createError({
                name: 'pid is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to get product',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const product = await productService.getProductById(pid)

        return res.render('product', {
            product: JSON.parse(JSON.stringify(product)),
            title: `Product: ${product.title}`
        })
    }

    getProductsMocks = async (req, res) => {
        const products = []
        for (let i = 0; i < 100; i++) {
            products.push(await generateProductMock())
        }

        return res.status(200).json({
            status: 'success',
            payload: products
        })
    }

    getProductsMocksForViews = async (req, res) => {
        const products = []
        for (let i = 0; i < 100; i++) {
            products.push(await generateProductMock())
        }

        return res.render('products', {
            payload: JSON.parse(JSON.stringify(products)),
            title: 'Products',
            firstName: req.session.firstName,
            userLog: req.session.firstName ? true : false
        })
    }
}

const productController = new ProductController()

export default productController
