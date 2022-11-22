import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Users from '../persistence/models/userModel.js'

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const userDB = await Users.findById(id)
    done(null, userDB)
})