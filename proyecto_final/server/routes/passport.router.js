import express from 'express'
import passport from "passport"

const router = express.Router()

class PassportRouter {
    init() {
        router.post('/signup', passport.authenticate('signup', { failureRedirect: '/users/regerror', successRedirect: '/' }))
        router.post('/login', passport.authenticate('login', { failureRedirect: '/users/logerror', successRedirect: '/' }))
        return router
    }
}

export const passportRouter = new PassportRouter()