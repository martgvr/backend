import { usersDAO } from "../persistence/daos/factory.js"

export default class UsersController {
    renderRegisterError = async (req,res) => res.render('error', { type: 'regerror' })
    renderLoginError = async (req,res) => res.render('error', { type: 'logerror' })
    renderRegister = async (req,res) => res.render('register')
    renderProfile = async (req,res) => res.render('profile', { params: req.user })
    logout = async (req,res) => req.logout(() => res.redirect('/'))

    renderPanel = async (req,res) => {
        if (req.user.data.admin === 1) {
            res.render('panel', { user: req.user })
        } else {
            res.render('error', { type: 'adminerror' })
        }
    }
}