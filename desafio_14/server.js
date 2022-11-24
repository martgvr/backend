import yargs from "yargs";
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import userRoutes from './routes/userRoutes.js'
import './persistence/dbConfig.js'

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
app.set('views', './views')
app.set('view engine', 'ejs')

const info = yargs(process.argv.slice(2))
    .alias({ p: 'port' })
    .default({ p: 8080 })
    .argv
    
const server = app.listen(info.p, (req, res) => console.log(info.p == 8080 ? `Escuchando el puerto por defecto: ${info.p}` : `Escuchando el puerto por parametro: ${info.p}`))
server.on('error', error => console.log(`Error: ${error}`));