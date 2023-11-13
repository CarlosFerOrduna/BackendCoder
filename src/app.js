import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import config from './config/dotenv.config.js'
import initializatePassport from './config/passport.config.js'
import router from './routers/index.js'
import __dirname from './utils/dirname.util.js'
import handlerError from './utils/handler.error.util.js'
import socketServer from './utils/socket.util.js'

const app = express()

app.use(cors())
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
app.use('/api/products', router.apiRouterProducts)
app.use('/api/carts', router.apiRoutercarts)
app.use('/api/users', router.apiRouterUsers)
app.use('/views/products', router.viewsRouterProducts)
app.use('/views/carts', router.viewsRouterCarts)
app.use('/views/users', router.viewsRouterUsers)
app.use('/views/chat', router.viewsRouterChats)
app.use('*', handlerError)

const httpServer = app.listen(config.port, () => {
    console.log(`Listen port: ${config.port}`)
})

socketServer.init(httpServer)
socketServer.run()
