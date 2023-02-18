import cors from 'cors'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import { logger } from "./utils/log4js.js"
import './utils/logHeader.js'

import { productsRouter } from './routes/products.router.js'
import { messagesRouter } from './routes/messages.router.js'
import { passportRouter } from './routes/passport.router.js'
import { cartsRouter } from './routes/carts.router.js'
import { usersRouter } from './routes/users.router.js'

import { mongoConnect } from './persistence/mongo.config.js'
import { createSQLiteTables } from './persistence/sqlite.config.js'

import passport from 'passport'
import './persistence/passport/local.passport.js'

import { upload } from './middlewares/multer.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/views'))

app.use(upload.single('avatar'))

app.use(session({
    saveUninitialized: false,
    resave: false,
    rolling: true,
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: { maxAge: 600000 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', productsRouter.init())
app.use('/users', usersRouter.init())
app.use('/carts', cartsRouter.init())
app.use('/auth', passportRouter.init())
app.use('/chat', messagesRouter.init())

app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8080

function createServer() {
    const server = app.listen(PORT, (req, res) => { 
        logger.info(`[ Listening ${PORT == 8080 ? 'default':'custom'} port: ${PORT} | Mode: ${process.env.CLUSTER == 'true' ? 'cluster' : 'fork'} | Process: ${process.pid} | DAO: ${process.env.DAO || 'mongoDB'} ]`)
    })
    process.env.DAO === 'mongo' && mongoConnect()
    process.env.DAO === 'sqlite' && createSQLiteTables()
    server.on('error', error => logger.error(`Error: ${error}`));
}

createServer()