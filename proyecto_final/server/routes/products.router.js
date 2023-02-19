import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import ProductsController from "../controllers/products.controller.js"

const router = express.Router()

class ProductsRouter {
    constructor() {
        this.ProductsController = new ProductsController()
    }
    
    init() {
        // VIEW RENDER
        router.get('/', isAuth, this.ProductsController.productsRedirect)

        // CRUD
        router.post('/products', isAuth, this.ProductsController.saveNewProduct)
        router.get('/products', isAuth, this.ProductsController.getProducts)
        router.get('/products/:productid', isAuth, this.ProductsController.getProductByID)
        router.put('/products/:productid', isAuth, this.ProductsController.updateProductByID)
        router.delete('/products/:productid', isAuth, this.ProductsController.DeleteProduct)

        return router
    }
}

export const productsRouter = new ProductsRouter()