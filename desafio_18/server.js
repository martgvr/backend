import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import userRoutes from './routes/userRoutes.js'
import apiRoutes from './routes/apiRoutes.js'

import './persistence/dbConfig.js'

import cluster from 'cluster'
import os from 'os'
const procNum = os.cpus().length

import passport from 'passport'
import './passport/localPassport.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { logger } from "./utils/log4js.js";
import './utils/logHeader.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/views'));

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

app.use('/', userRoutes)
app.use('/api', apiRoutes)

app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8080

function createServer() {
    const server = app.listen(PORT, (req, res) => { 
        logger.info(`[ Listening ${PORT == 8080 ? 'default':'custom'} port: ${PORT} | Mode: ${process.env.CLUSTER == 'true' ? 'cluster' : 'fork'} | Process: ${process.pid} ]`)
    })
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