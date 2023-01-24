import express from 'express'
import usersController from '../controllers/users.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = express.Router()

router.get('/profile', isAuth, usersController.renderProfile)
router.get('/regerror', usersController.renderRegisterError)
router.get('/logerror', usersController.renderLoginError)
router.get('/register', usersController.renderRegister)
router.get('/logout', usersController.logout)

export default router