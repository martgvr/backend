import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import userRoutes from './routes/userRoutes.js'
import passport from 'passport'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import './persistence/dbConfig.js'
import './passport/localPassport.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/views'));

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'keySession',
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', userRoutes)
app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));