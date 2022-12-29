import passport from "passport"
import { Router } from "express"
import { isAuth } from '../middleware/isAuth.js'
import { transporter } from '../utils/nodemailer.js'

import CartMongoDAO from "../persistence/daos/cartMongoDAO.js"
import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const router = Router()
const cartDB = new CartMongoDAO()
const db = new ProductsMongoDAO()

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

router.get('/products', isAuth, (req, res) => db.getAll().then(data => res.render('products', { user: req.user, data: data })))

router.get('/logout', (req, res) => req.logout(() => res.redirect('/')))

router.get('/cart', isAuth, (req, res) => { 
    cartDB.findCartByID(req.user.cartID).then(response => {
        let total = 0;
        response.products.forEach(element => {
            total += Number(element.itemPrice);
        });
        res.render('cart', { data: response, user: req.user, total: total })
    })
})

router.post('/cart', isAuth, (req, res) => { 
    cartDB.addItemToCart(req.user.cartID, req.body.product).then(response => {
        res.send(response)
    })
})

router.post('/buy', isAuth, async (req, res) => { 
    cartDB.findCartByID(req.user.cartID).then(response => {
        let total = 0
        response.products.forEach(element => total += Number(element.itemPrice))

        let emailContent = `<h1>Gracias por tu compra! ${req.user.name}</h1><h4>Tu compra está en camino</h4>`
        response.products.forEach(element => emailContent += `<p>Item: ${element.itemName} | Precio: ${element.itemPrice}</p>`)
        emailContent += `<br><p>Total: ${total}</p>`

        transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `${req.user.name} <${req.user.email}>`,
            subject: 'Compra realizada con éxito!',
            html: emailContent
        })
    })
})

export default router