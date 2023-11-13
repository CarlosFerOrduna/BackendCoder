export default class ProductDTO {
    constructor(product) {
        this.title = product.title || null
        this.description = product.description || null
        this.code = product.code || null
        this.price = product.price || null
        this.status = product.status || null
        this.stock = product.stock || null
        this.category = product.category || null
        this.thumbnails = product.thumbnails || null
    }
}
