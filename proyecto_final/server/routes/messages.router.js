import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import MessagesController from "../controllers/messages.controller.js"

const router = express.Router()

class MessagesRouter {
    constructor() {
        this.MessagesController = new MessagesController()
    }
    
    init() {
        router.get('/', isAuth, this.MessagesController.getHandler)
        router.post('/', isAuth, this.MessagesController.postHandler)
        return router
    }
}

export const messagesRouter = new MessagesRouter()