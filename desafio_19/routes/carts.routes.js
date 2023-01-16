import express from 'express'
import cartsController from '../controllers/carts.controller.js'

const router = express.Router()

router.get('/cart', isAuth, cartsController.getCart)
router.post('/cart', isAuth, cartsController.postCart)
router.post('/buy', isAuth, cartsController.cartCheckout)

export default router