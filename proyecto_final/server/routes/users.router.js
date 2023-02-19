import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import UsersController from "../controllers/users.controller.js"

const router = express.Router()

class UsersRouter {
    constructor() {
        this.UsersController = new UsersController()
    }
    
    init() {
        router.get('/profile', isAuth, this.UsersController.renderProfile)
        router.get('/regerror', this.UsersController.renderRegisterError)
        router.get('/logerror', this.UsersController.renderLoginError)
        router.get('/signup', this.UsersController.renderRegister)
        router.get('/logout', this.UsersController.logout)

        router.get('/panel', isAuth, this.UsersController.renderPanel)
        return router
    }
}

export const usersRouter = new UsersRouter()