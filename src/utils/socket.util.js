import { Server } from 'socket.io'
import productManager from '../dao/fileSystem/ProductManager.js'
import MessageService from '../services/messages.service.js'

let server
const messageService = new MessageService()

const socketServer = {
    init: (httpServer) => {
        server = new Server(httpServer)
    },
    run: () => {
        try {
            if (server) {
                server.on('connection', async (socket) => {
                    const products = await productManager.getProducts()
                    const messages = await messageService.getMessages()

                    server.emit('load_products', { products })
                    socket.emit('load_message', { messages })

                    socket.on('create_product', async (data) => {
                        await productManager.addProduct(data)

                        server.emit('load_products', { products })
                    })

                    socket.on('delete_product', async (data) => {
                        await productManager.deleteProduct(data)

                        server.emit('load_products', { data })
                    })

                    socket.on('insert_message', async (data) => {
                        await messageService.insertMessage(data)

                        const messages = await messageService.getMessages()

                        socket.emit('load_message', { messages })
                    })
                })
            }
        } catch (error) {
            console.error(error.message)
        }
    }
}

export default socketServer
