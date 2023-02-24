import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import CartsController from "../controllers/carts.controller.js"

const router = express.Router()

class CartsRouter {
    constructor() {
        this.CartsController = new CartsController()
    }
    
    init() {
        router.get('/', isAuth, this.CartsController.getData)
        router.get('/success', isAuth, this.CartsController.successRender)
        router.post('/', isAuth, this.CartsController.saveData)
        router.post('/checkout', isAuth, this.CartsController.cartCheckout)
        router.delete('/:cartid', isAuth, this.CartsController.clearCartByID)
        router.delete('/:cartid/:itemid', isAuth, this.CartsController.removeCartItem)
        return router
    }
}

export const cartsRouter = new CartsRouter()