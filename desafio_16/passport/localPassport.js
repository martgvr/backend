import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Users from '../persistence/models/userModel.js'

passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const userDB = await Users.find({ username })
    if (userDB.length > 0) {
        return done(null, false)
    } else {
        const user = new Users()
        user.username = username
        user.password = password
        user.save()
        done(null, user)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => { 
    const userDB = await Users.find({ username, password })
    if (userDB.length === 0) {
        done(null, false)
    } else {
        done(null, ...userDB)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const userDB = await Users.findById(id)
    done(null, userDB)
})