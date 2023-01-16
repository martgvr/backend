import express from 'express'
import cartsController from '../controllers/carts.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = express.Router()

router.get('/', isAuth, cartsController.getCart)
router.post('/', isAuth, cartsController.postCart)
router.post('/checkout', isAuth, cartsController.cartCheckout)

export default router