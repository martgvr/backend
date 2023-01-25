import { productsDAO } from '../persistence/daos/factory.js'

const productsRedirect = async (req,res) => res.redirect('/products')

const getProducts = async (req,res) => {
    try {
        productsDAO.getAll().then(data => res.render('products', { user: req.user, data: data }))
    } catch (error) {
        res.send('Something went wrong getting products :/')
    }
}

export default { productsRedirect, getProducts }
