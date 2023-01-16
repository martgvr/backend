import express from 'express'
import usersController from '../controllers/users.controller.js'

const router = express.Router()

router.get('/logerror', usersController.renderLoginError)
router.get('/regerror', usersController.renderRegisterError)
router.get('/profile', isAuth, usersController.renderProfile)
router.get('/logout', usersController.logout)

export default router