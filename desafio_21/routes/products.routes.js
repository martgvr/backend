import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import ProductsController from '../controllers/products.controller.js'

const router = express.Router()

class ProductsRoutes {
    constructor() {
        this.ProductsController = new ProductsController()
    }

    init() {
        router.get('/', isAuth, this.ProductsController.productsRedirect)
        router.get('/products', isAuth, this.ProductsController.getProducts)
        return router
    }
}

export const productsRoutes = new ProductsRoutes()