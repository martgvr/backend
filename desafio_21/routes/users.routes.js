import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import UsersController from '../controllers/users.controller.js'

const router = express.Router()

class UsersRoutes {
    constructor() {
        this.UsersController = new UsersController()
    }

    init() {
        router.get('/profile', isAuth, this.UsersController.renderProfile)
        router.get('/regerror', this.UsersController.renderRegisterError)
        router.get('/logerror', this.UsersController.renderLoginError)
        router.get('/register', this.UsersController.renderRegister)
        router.get('/logout', this.UsersController.logout)
        return router
    }
}

export const usersRoutes = new UsersRoutes()