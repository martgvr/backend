import yargs from "yargs";
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

const info = yargs(process.argv.slice(2))
    .alias({ p: 'port', m: 'mode' })
    .default({ p: 8080, m: 'fork' })
    .argv

function createServer() {
    const server = app.listen(info.p, (req, res) => { 
        console.log(`[ Listening ${info.p == 8080 ? 'default':'custom'} port: ${info.p} | Mode: ${info.m} | Process: ${process.pid} ]` )
    })
    server.on('error', error => console.log(`Error: ${error}`));
}

if (info.m === 'cluster') {
    if (cluster.isPrimary) {
        console.log(`[ Proceso maestro: ${process.pid} ]`)
        for (let i = 0; i < 3; i++) { cluster.fork() }
        cluster.on('exit', () => cluster.fork())
    } else {
        createServer()
    }   
} else {
    createServer()
}