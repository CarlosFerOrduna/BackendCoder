import { connect } from 'mongoose'
import config from '../../config/dotenv.config.js'

export let Carts
export let Products
export let Users

switch (config.persistence) {
    case 'mongo':
        await connect(config.connectionString)
        const { default: CartsMongo } = await import('./mongo/carts.mongo.js')
        Carts = CartsMongo
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
        Products = ProductsMongo
        const { default: UsersMongo } = await import('./mongo/users.mongo.js')
        Users = UsersMongo
        break

    case 'memory':
        const base = './memory/fileSystem/'
        const { default: CartsMemory } = await import(`${base}CartManager.js`)
        Carts = CartsMemory
        const { default: ProductsMemory } = await import(`${base}ProductManager.js`)
        Products = ProductsMemory
        break
}
