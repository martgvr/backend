import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import passportRouter from './routes/passport.routes.js'
import usersRouter from './routes/users.routes.js'

import cluster from 'cluster'
import os from 'os'

import passport from 'passport'
import './persistence/passport/localPassport.js'
import { mongoConnect } from './persistence/dbConfig.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { logger } from "./utils/log4js.js";
import { upload } from './middlewares/multer.js'
import './utils/logHeader.js'

const procNum = os.cpus().length
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/views'));
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

app.use('/', productsRouter)
app.use('/cart', cartsRouter)
app.use('/passport', passportRouter)
app.use('/user', usersRouter)

app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8080

function createServer() {
    const server = app.listen(PORT, (req, res) => { 
        logger.info(`[ Listening ${PORT == 8080 ? 'default':'custom'} port: ${PORT} | Mode: ${process.env.CLUSTER == 'true' ? 'cluster' : 'fork'} | Process: ${process.pid} | DAO: ${process.env.DAO || 'mongoDB'} ]`)
    })
    process.env.DAO !== 'file' && mongoConnect()
    server.on('error', error => logger.error(`Error: ${error}`));
}

if (process.env.CLUSTER == 'true') {
    if (cluster.isPrimary) {
        logger.info(`[ Proceso maestro: ${process.pid} ]`)
        for (let i = 0; i < procNum; i++) { cluster.fork() }
        cluster.on('exit', () => cluster.fork())
    } else {
        createServer()
    }   
} else {
    createServer()
}