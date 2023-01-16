import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const productsDB = new ProductsMongoDAO()

const productsRedirect = async (req,res) => res.redirect('/products')

const getProducts = async (req,res) => {
    try {
        productsDB.getAll().then(data => res.render('products', { user: req.user, data: data }))
    } catch (error) {
        res.send('Something went wrong :/')
    }
}

export default { productsRedirect, getProducts }
