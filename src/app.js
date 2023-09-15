import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import apiCartsRouter from './routers/carts.api.routes.js';
import viewsCartsRouter from './routers/carts.views.routes.js';
import viewsChatRouter from './routers/char.views.routes.js';
import apiProductsRouter from './routers/products.api.routes.js';
import viewsProductRouter from './routers/products.views.routes.js';
import apiUserRouter from './routers/user.api.routes.js';
import connectMongo from './utils/connections.utils.js';
import __dirname from './utils/dirname.utils.js';
import socketServer from './utils/socket.utils.js';

const app = express();
const port = 8080;
const connectionString =
    'mongodb+srv://fernandoorduna:nBUXrvkY5aVVjpcL@backend.zofjiwj.mongodb.net/ecommerce?retryWrites=true&w=majority';

connectMongo(connectionString);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: connectionString,
            ttl: 15
        }),
        secret: 'fernandoorduna',
        resave: false,
        saveUninitialized: false
    })
);

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);
app.use('/api/users', apiUserRouter);
app.use('/views/products', viewsProductRouter);
app.use('/views/carts', viewsCartsRouter);
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

socketServer.init(httpServer);
socketServer.run();
