import { Strategy as LocalStrategy } from "passport-local"
import passport from "passport"
import bcrypt from 'bcrypt'

import usersRepository from '../repositories/users.repository.js'

import { usersModel as Users } from '../models/users.model.js'
import { cartsDAO } from '../daos/factory.js'
import { usersDAO } from '../daos/factory.js'

passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const userDB = await usersDAO.find({ username })

    if (userDB.length > 0) {
        return done(null, false)
    } else {
        const user = new Users()
        user.username = username
        user.password = await bcrypt.hash(password, 10)
        
        const { email, name, address, age, areacode, telephone } = req.body
        user.email = email
        user.name = name
        user.address = address
        user.age = age
        user.areacode = areacode
        user.telephone = telephone
        user.avatar = req.file.filename
        user.cartID = Math.floor(Math.random() * 1000)

        const usersRepoInstance = new usersRepository(user)
        usersRepoInstance.sendEmail()

        cartsDAO.save({ cartID: user.cartID, products: [], total: 0 })
        usersDAO.save(process.env.DAO === 'file' ? user._doc : user)
        done(null, user)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const findUser = await usersDAO.find({ username })
    let userDB = Array.isArray(findUser) ? findUser : [findUser]

    if (userDB.length == 0) {
        done(null, false);
    } else {
        bcrypt.compare(password, userDB[0].password, function(err, result) {
            if (result === false) {
                done(null, false)
            } else {
                done(null, ...userDB)
            }
        });
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const userDB = await usersDAO.getByID(id)
    done(null, userDB)
})