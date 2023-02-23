import { usersDAO, productsDAO, cartsDAO, ordersDAO } from "../persistence/daos/factory.js"

export default class UsersController {
    logout = async (req,res) => req.logout(() => res.redirect('/'))
    getByUsername = async (req, res) => res.send(await usersDAO.findByUsername(req.params.username))
    updateByUsername = async (req, res) => res.send(await usersDAO.updateByUsername(req.params.username, req.body))

    renderRegisterError = async (req,res) => res.render('error', { type: 'regerror' })
    renderLoginError = async (req,res) => res.render('error', { type: 'logerror' })
    renderProfile = async (req,res) => res.render('profile', { params: req.user })
    renderRegister = async (req,res) => res.render('register')

    renderPanel = async (req,res) => {
        if (req.user.data.admin === 1) {
            req.query.tab === 'products' && res.render('panel', { user: req.user, tab: req.query.tab, data: await productsDAO.getAll() })
            req.query.tab === 'carts' && res.render('panel', { user: req.user, tab: req.query.tab, data: await cartsDAO.getAll() })
            req.query.tab === 'orders' && res.render('panel', { user: req.user, tab: req.query.tab, data: await ordersDAO.getAll() })
            req.query.tab === 'users' && res.render('panel', { user: req.user, tab: req.query.tab, data: await usersDAO.getAll() })
        } else {
            res.render('error', { type: 'adminerror' })
        }
    }
}