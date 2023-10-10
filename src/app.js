import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import initializatePassport from './config/passport.config.js'
import {
    apiRouterProducts,
    apiRouterUsers,
    apiRoutercarts,
    viewsRouterCarts,
    viewsRouterChats,
    viewsRouterProducts,
    viewsRouterUsers
} from './routers/index.js'
import connectMongo from './utils/connections.util.js'
import __dirname from './utils/dirname.util.js'
import socketServer from './utils/socket.util.js'
import handlerError from './utils/handler.error.util.js'

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
app.use('/api/products', apiRouterProducts)
app.use('/api/carts', apiRoutercarts)
app.use('/api/users', apiRouterUsers)
app.use('/views/products', viewsRouterProducts)
app.use('/views/carts', viewsRouterCarts)
app.use('/views/users', viewsRouterUsers)
app.use('/views/chat', viewsRouterChats)
app.use('*', handlerError)

const httpServer = app.listen(port, () => {
    console.log(`Listen port: ${port}`)
})

socketServer.init(httpServer)
socketServer.run()
