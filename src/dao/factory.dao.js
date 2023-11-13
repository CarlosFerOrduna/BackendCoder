import { connect } from 'mongoose'
import config from '../config/dotenv.config.js'

export let Cart
export let Product
export let User
export let Message
export let Ticket

switch (config.persistence) {
    case 'mongo':
        try {
            await connect(config.connectionString)
            console.log('connected successfully')

            const { default: CartsMongo } = await import('./mongo/carts.mongo.js')
            Cart = CartsMongo
            const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
            Product = ProductsMongo
            const { default: UsersMongo } = await import('./mongo/users.mongo.js')
            User = UsersMongo
            const { default: MessagesMongo } = await import('./mongo/messages.mongo.js')
            Message = MessagesMongo
            const { default: TicketsMongo } = await import('./mongo/tickets.mongo.js')
            Ticket = TicketsMongo
        } catch (error) {
            console.error(error)
            throw new Error('can not connect to the db')
        }
        break

    case 'memory':
        const base = './memory/fileSystem/'
        const { default: CartsMemory } = await import(`${base}CartManager.js`)
        Cart = CartsMemory
        const { default: ProductsMemory } = await import(`${base}ProductManager.js`)
        Product = ProductsMemory
        break
}
