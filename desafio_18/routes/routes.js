import passport from "passport";
import { Router } from "express";
import { isAuth } from '../middleware/isAuth.js'

import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const router = Router();
const db = new ProductsMongoDAO();

router.get('/saveproduct', async (req, res) => {
    // db.save({ name: 'Cartuchera Argentina', price: '1500', photo: 'https://http2.mlstatic.com/D_NQ_NP_943811-MLA20642384219_032016-O.jpg' }).then(response => res.json(response))
});

router.get('/', isAuth, (req, res) => res.redirect('/products'))

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

router.get('/profile', isAuth, (req, res) => res.render('profile', { data: req.user }))

router.get('/products', isAuth, (req, res) => db.getAll().then(data => res.render('products', { username: req.user.username, data: data })))

router.get('/logout', (req, res) => req.logout(() => res.redirect('/')))

export default router