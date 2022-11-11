import express from 'express'
import session from 'express-session';
import MongoStore from 'connect-mongo';

import * as dotenv from 'dotenv'
dotenv.config()

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/views'));

app.set('views', './views')
app.set('view engine', 'ejs')

// ------------------------- COOKIES -------------------------

const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vpzccsu.mongodb.net/dbCookies?retryWrites=true&w=majority`;

app.use(session({
    secret: 'mongoKey',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: URL }),
    cookie: { maxAge: 30000 }
}))

app.get('/', (req, res) => {
    req.session.email && req.session.password ? res.render('session', { logged: true, user: req.session.email }) : res.render('session', { logged: false });
})

app.post('/session', (req, res) => {
    for (const key in req.body) {
        req.session[key] = req.body[key]
    }
    res.render('session', { logged: true, user: req.session.email })
})

app.post('/logout', (req, res) => {
    res.clearCookie('connect.sid', {path: '/'}).render('session', { logged: false })
});

// -----------------------------------------------------------

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));