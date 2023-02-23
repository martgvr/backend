import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import OrdersController from '../controllers/orders.controller.js'

const router = express.Router()

class OrdersRouter {
    constructor() {
        this.OrdersController = new OrdersController()
    }
    
    init() {
        router.post('/', isAuth, this.OrdersController.saveData)
        router.get('/', isAuth, this.OrdersController.getData)
        router.get('/:id', isAuth, this.OrdersController.getDataByID)
        router.put('/:id', isAuth, this.OrdersController.updateDataByID)
        router.delete('/all', isAuth,this.OrdersController.deleteAll)
        router.delete('/:messageid', isAuth, this.OrdersController.deleteByID)
        
        return router
    }
}

export const ordersRouter = new OrdersRouter()