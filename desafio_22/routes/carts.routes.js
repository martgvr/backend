import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import CartsController from '../controllers/carts.controller.js'

const router = express.Router()

class CartsRoutes {
    constructor() {
        this.CartsController = new CartsController()
    }
    
    init() {
        router.get('/', isAuth, this.CartsController.getCart)
        router.post('/', isAuth, this.CartsController.postCart)
        router.post('/checkout', isAuth, this.CartsController.cartCheckout)
        return router
    }
}

export const cartsRoutes = new CartsRoutes()