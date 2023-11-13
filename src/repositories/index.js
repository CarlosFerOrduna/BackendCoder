import { Carts } from '../dao/factory.dao.js'
import CartRepository from './carts.repository.js'

export const cartsService = new CartRepository(new Carts())
