import passport from "passport"
import { Router } from "express"
import { isAuth } from '../middlewares/isAuth.js'

import usersController from '../controllers/users.controller.js'
import productsController from '../controllers/products.controller.js'
import cartsController from '../controllers/carts.controller.js'

const router = Router()

router.get('/register', usersController.renderRegister)

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/regerror',
    successRedirect: '/products'
}))

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/logerror',
    successRedirect: '/products'
}))

router.get('/logerror', usersController.renderLoginError)
router.get('/regerror', usersController.renderRegisterError)
router.get('/profile', isAuth, usersController.renderProfile)
router.get('/logout', usersController.logout)

router.get('/', isAuth, productsController.productsRedirect)
router.get('/products', isAuth, productsController.getProducts)

router.get('/cart', isAuth, cartsController.getCart)
router.post('/cart', isAuth, cartsController.postCart)
router.post('/buy', isAuth, cartsController.cartCheckout)

export default router