import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import MessagesController from "../controllers/messages.controller.js"

const router = express.Router()

class MessagesRouter {
    constructor() {
        this.MessagesController = new MessagesController()
    }
    
    init() {
        router.get('/', isAuth, this.MessagesController.getData)
        router.post('/', isAuth, this.MessagesController.saveData)
        router.delete('/all', this.MessagesController.deleteAll)
        router.delete('/:messageid', this.MessagesController.deleteByID)
        
        return router
    }
}

export const messagesRouter = new MessagesRouter()