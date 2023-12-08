import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import compression from 'express-compression'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import config from './config/dotenv.config.js'
import initializatePassport from './config/passport.config.js'
import handlerError from './middlewares/errors/index.js'
import router from './routers/index.js'
import CustomError from './services/errors/CostumError.js'
import errorCodes from './services/errors/enum.errors.js'
import __dirname from './utils/dirname.util.js'
import socketServer from './utils/socket.util.js'
import { addLogger } from './middlewares/logs/index.js'

const app = express()

app.use(cors())
app.use(compression({ brotli: { enabled: true, zlib: {} } }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({ mongoUrl: config.connectionString, ttl: 10 * 60 }),
        secret: 'coderhouse',
        resave: false,
        saveUninitialized: true
    })
)
initializatePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use(addLogger)
app.use('/', router)
app.use('*', (req, res) => {
    CustomError.createError({
        name: 'invalid route',
        cause: 'invalid route',
        message: 'invalid route',
        code: errorCodes.ROUTING_ERROR
    })
})

app.use(handlerError)

const httpServer = app.listen(config.port, () => console.log(`Listen port: ${config.port}`))

socketServer.init(httpServer)
socketServer.run()
// 00:20
