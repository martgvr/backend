import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import UsersController from "../controllers/users.controller.js"

const router = express.Router()

class UsersRouter {
    constructor() {
        this.UsersController = new UsersController()
    }
    
    init() {
        // VIEW RENDER
        router.get('/profile', isAuth, this.UsersController.renderProfile)
        router.get('/regerror', this.UsersController.renderRegisterError)
        router.get('/panel', isAuth, this.UsersController.renderPanel)
        router.get('/logerror', this.UsersController.renderLoginError)
        router.get('/signup', this.UsersController.renderRegister)
        router.get('/logout', this.UsersController.logout)

        // CRUD
        router.get('/:username', isAuth, this.UsersController.getUserByUsername)
        router.put('/:username', isAuth, this.UsersController.UpdateUserByUsername)

        return router
    }
}

export const usersRouter = new UsersRouter()