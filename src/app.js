import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productManager from './dao/fileSystem/ProductManager.js';
import apiCartsRouter from './routers/carts.api.routes.js';
import { router as viewsChatRouter } from './routers/char.views.routes.js';
import apiProductsRouter from './routers/products.api.routes.js';
import viewsProductRouter from './routers/products.views.routes.js';
import messageService from './services/messages.service.js';
import { connectMongo } from './utils/connections.js';
import __dirname from './utils/dirname.utils.js';

const app = express();
const port = 8080;

connectMongo();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);
app.use('/views/products', viewsProductRouter);
app.use('/views/chat', viewsChatRouter);
app.use('*', (req, res) => {
    return res.status(400).json({
        status: 'error',
        message: 'Bad request',
        data: []
    });
});

const httpServer = app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    try {
        const products = await productManager.getProducts();
        const messages = await messageService.getMessages();

        socketServer.emit('load_products', { products });
        socket.emit('load_message', { messages });

        socket.on('create_product', async (data) => {
            await productManager.addProduct(data);

            socketServer.emit('load_products', { products });
        });

        socket.on('delete_product', async (data) => {
            await productManager.deleteProduct(data);

            socketServer.emit('load_products', { data });
        });

        socket.on('insert_message', async (data) => {
            await messageService.insertMessage(data);

            const messages = await messageService.getMessages();

            socket.emit('load_message', { messages });
        });
    } catch (error) {
        console.error(error.message);
    }
});
