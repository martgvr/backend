import { productsDAO } from '../persistence/daos/factory.js'

export default class ProductsController {
    productsRedirect = async (req,res) => res.redirect('/products')

    getProducts = async (req,res) => {
        try {
            productsDAO.getAll().then(data => res.render('products', { user: req.user, data: data }))
        } catch (error) {
            res.send('Something went wrong getting products :/')
        }
    }
}