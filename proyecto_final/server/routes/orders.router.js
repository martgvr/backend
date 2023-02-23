import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import OrdersController from '../controllers/orders.controller.js'

const router = express.Router()

class OrdersRouter {
    constructor() {
        this.OrdersController = new OrdersController()
    }
    
    init() {
        router.post('/', this.OrdersController.saveData)
        router.get('/', this.OrdersController.getData)
        router.get('/:id', this.OrdersController.getDataByID)
        router.put('/:id', this.OrdersController.updateDataByID)
        router.delete('/all', this.OrdersController.deleteAll)
        router.delete('/:messageid', this.OrdersController.deleteByID)
        
        return router
    }
}

export const ordersRouter = new OrdersRouter()