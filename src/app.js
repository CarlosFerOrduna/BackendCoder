import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import initializatePassport from './config/passport.config.js'
import apiCartsRouter from './routers/carts.api.routes.js'
import viewsCartsRouter from './routers/carts.views.routes.js'
import viewsChatRouter from './routers/char.views.routes.js'
import apiProductsRouter from './routers/products.api.routes.js'
import viewsProductRouter from './routers/products.views.routes.js'
import apiUserRouter from './routers/user.api.routes.js'
import viewsUserRouter from './routers/user.views.routes.js'
import connectMongo from './utils/connections.util.js'
import __dirname from './utils/dirname.util.js'
import socketServer from './utils/socket.util.js'

dotenv.config()
const app = express()
const port = process.env.PORT

connectMongo()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING, ttl: 10 * 60 }),
        secret: 'coderhouse',
        resave: false,
        saveUninitialized: true
    })
)
initializatePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use('/api/products', apiProductsRouter)
app.use('/api/carts', apiCartsRouter)
app.use('/api/users', apiUserRouter)
app.use('/views/products', viewsProductRouter)
app.use('/views/carts', viewsCartsRouter)
app.use('/views/users', viewsUserRouter)
app.use('/views/chat', viewsChatRouter)
app.use('*', (req, res) => {
    return res.status(400).json({
        status: 'error',
        message: 'Bad request',
        data: []
    })
})

const httpServer = app.listen(port, () => {
    console.log(`Listen port: ${port}`)
})

socketServer.init(httpServer)
socketServer.run()
