import os from 'os'
import passport from "passport";
import { Router } from "express";
import { isAuth } from '../middleware/isAuth.js'

import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const router = Router();
const db = new ProductsMongoDAO();

router.get('/saveproduct', async (req, res) => {
    // db.save({ name: 'Producto 3', price: '300', photo: 'foto' }).then(response => res.json(response))
});

router.get('/', isAuth, (req, res) => {
    res.redirect('/products')
})

router.get('/register', (req, res) => res.render('register'))

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/regerror',
    successRedirect: '/products'
}))

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/logerror',
    successRedirect: '/products'
}))

router.get('/logerror', (req, res) => res.render('error', { text: 'Usuario o contraseña incorrectos.', type: 'logerror' }))
router.get('/regerror', (req, res) => res.render('error', { text: 'Este usuario ya se encuentra registrado.', type: 'regerror' }))

router.get('/data', isAuth, (req, res) => res.render('data', { username: req.user.username }))

router.get('/products', isAuth, (req, res) => {
    console.log('Cargando productos...');
    db.getAll().then(data => res.render('products', { username: req.user.username, data: data }))
})

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

const processData = {
    args: process.argv.slice(2),
    os: process.platform,
    nodeVersion: process.versions.node,
    rss: process.memoryUsage.rss(),
    execPath: process.execPath,
    pid: process.pid,
    path: process.cwd(),
    cpus: os.cpus().length
}

router.get('/info', (req, res) => res.render('info', { processData }))

export default router