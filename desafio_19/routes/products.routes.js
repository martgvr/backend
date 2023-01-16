import express from 'express'
import productsController from '../controllers/products.controller.js'

const router = express.Router()

router.get('/', isAuth, productsController.productsRedirect)
router.get('/products', isAuth, productsController.getProducts)

export default router