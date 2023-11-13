import { Carts, Messages, Products, Users } from '../dao/factory.dao.js'
import CartRepository from './carts.repository.js'
import MessageRepository from './message.repository.js'
import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'

export const cartService = new CartRepository(new Carts())
export const productService = new ProductRepository(new Products())
export const userService = new UserRepository(new Users())
export const messageService = new MessageRepository(new Messages())
