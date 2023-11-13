import { Cart, Message, Product, Ticket, User } from '../dao/factory.dao.js'
import CartRepository from './carts.repository.js'
import MessageRepository from './message.repository.js'
import ProductRepository from './products.repository.js'
import TicketRepository from './tickets.repository.js'
import UserRepository from './users.repository.js'

export const cartService = new CartRepository(new Cart())
export const productService = new ProductRepository(new Product())
export const userService = new UserRepository(new User())
export const messageService = new MessageRepository(new Message())
export const ticketService = new TicketRepository(new Ticket())
