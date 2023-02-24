import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import ProductsController from "../controllers/products.controller.js"

const router = express.Router()

class ProductsRouter {
    constructor() {
        this.ProductsController = new ProductsController()
    }
    
    init() {
        router.get('/', isAuth, this.ProductsController.productsRedirect)
        router.post('/products', isAuth, this.ProductsController.saveData)
        router.get('/products', isAuth, this.ProductsController.getData)
        router.get('/products/:productid', isAuth, this.ProductsController.getByID)
        router.put('/products/:productid', isAuth, this.ProductsController.updateByID)
        router.delete('/products/:productid', isAuth, this.ProductsController.deleteByID)

        return router
    }
}

export const productsRouter = new ProductsRouter()