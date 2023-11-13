import { connect } from 'mongoose'
import config from '../config/dotenv.config.js'

export let Carts
export let Products
export let Users
export let Messages

switch (config.persistence) {
    case 'mongo':
        try {
            await connect(config.connectionString)
            console.log('connected successfully')

            const { default: CartsMongo } = await import('./mongo/carts.mongo.js')
            Carts = CartsMongo
            const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
            Products = ProductsMongo
            const { default: UsersMongo } = await import('./mongo/users.mongo.js')
            Users = UsersMongo
            const { default: MessagesMongo } = await import('./mongo/messages.mongo.js')
            Messages = MessagesMongo
        } catch (error) {
            console.error(error)
            throw new Error('can not connect to the db')
        }
        break

    case 'memory':
        const base = './memory/fileSystem/'
        const { default: CartsMemory } = await import(`${base}CartManager.js`)
        Carts = CartsMemory
        const { default: ProductsMemory } = await import(`${base}ProductManager.js`)
        Products = ProductsMemory
        break
}
