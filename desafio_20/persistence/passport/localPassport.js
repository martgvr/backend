import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { transporter } from '../../utils/nodemailer.js'
import bcrypt from 'bcrypt'

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

        // let emailContent =    `
        //                         <h1>Información de usuario:</h1>
        //                         <p>Hola ${name}</p>
        //                         <p>Tu correo es: ${email}</p>
        //                         <h4>Gracias por registrarte en nuestra tienda</h4>
        //                         `

        // await transporter.sendMail({
        //     from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
        //     to: `${name} <${email}>`,
        //     subject: 'Registro exitoso',
        //     html: emailContent
        // })

        // emailContent =      `<h1>Nuevo usuario registrado</h1>
        //                     <p>Nombre de usuario: ${username}</p>
        //                     <p>Nombre y Apellido: ${name}</p>
        //                     <p>Dirección: ${address}</p>
        //                     <p>Edad: ${age}</p>
        //                     <p>Teléfono: ${areacode} ${telephone}</p>
        //                     <p>ID de carrito: ${user.cartID}</p>`

        // await transporter.sendMail({
        //     from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
        //     to: `Administrador <${process.env.ADMIN_EMAIL}>`,
        //     subject: '[ADMIN] - Nuevo usuario registrado',
        //     html: emailContent
        // })

        cartsDAO.save({ cartID: user.cartID, products: [], total: 0 })
        usersDAO.save(user)

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