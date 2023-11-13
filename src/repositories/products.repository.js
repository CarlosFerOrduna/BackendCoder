import ProductDTO from '../dao/dto/products.dto.js'

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    addProduct = async (product) => {
        const productDto = new ProductDTO(product)
        return await this.dao.addProduct(productDto)
    }

    getProducts = async (limit, sort, page, query) => {
        return await this.dao.getProducts(limit, sort, page, query)
    }

    getProductById = async (pid) => {
        return await this.dao.getProductById(pid)
    }

    updateProduct = async (pid, productUpdated) => {
        return await this.dao.updateProduct(pid, productUpdated)
    }

    deleteProduct = async (pid) => {
        return await this.dao.deleteProduct(pid)
    }
}
