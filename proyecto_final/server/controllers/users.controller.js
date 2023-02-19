import { usersDAO, productsDAO, cartsDAO } from "../persistence/daos/factory.js"

export default class UsersController {
    renderRegisterError = async (req,res) => res.render('error', { type: 'regerror' })
    renderLoginError = async (req,res) => res.render('error', { type: 'logerror' })
    renderProfile = async (req,res) => res.render('profile', { params: req.user })
    renderRegister = async (req,res) => res.render('register')
    logout = async (req,res) => req.logout(() => res.redirect('/'))

    renderPanel = async (req,res) => {
        if (req.user.data.admin === 1) {
            req.query.tab === 'products' && res.render('panel', { user: req.user, tab: req.query.tab, data: await productsDAO.getAll() })
            req.query.tab === 'users' && res.render('panel', { user: req.user, tab: req.query.tab, data: await usersDAO.getAll() })
            req.query.tab === 'carts' && res.render('panel', { user: req.user, tab: req.query.tab, data: await cartsDAO.getAll() })
        } else {
            res.render('error', { type: 'adminerror' })
        }
    }

    getUserByUsername = async (req, res) => res.send(await usersDAO.findByUsername(req.params.username))
}