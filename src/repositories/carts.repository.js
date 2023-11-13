export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    createCart = async () => {
        return await this.dao.createCart()
    }

    getCartById = async (cid) => {
        return await this.dao.getCartById(cid)
    }

    addProductInCart = async (cid, pid) => {
        return await this.dao.addProductInCart(cid, pid)
    }

    updateQuantityById = async (cid, pid, quantity) => {
        return await this.dao.updateQuantityById(cid, pid, quantity)
    }

    addProductsInCart = async (cid, products) => {
        return await this.dao.addProductsInCart(cid, products)
    }

    removeProductInCart = async (cid, pid) => {
        return await this.dao.removeProductInCart(cid, pid)
    }

    removeAllProductsInCart = async (cid) => {
        return await this.dao.removeAllProductsInCart(cid)
    }
}
