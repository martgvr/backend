import express from 'express'
import passport from "passport"

const router = express.Router()

class PassportRoutes {
    init() {
        router.post('/register', passport.authenticate('register', { failureRedirect: '/user/regerror', successRedirect: '/' }))
        router.post('/login', passport.authenticate('login', { failureRedirect: '/user/logerror', successRedirect: '/' }))
        return router
    }
}

export const passportRoutes = new PassportRoutes()