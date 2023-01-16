import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const productsDB = new ProductsMongoDAO()

const productsRedirect = async (req,res) => res.redirect('/products')
const getProducts = async (req,res) => productsDB.getAll().then(data => res.render('products', { user: req.user, data: data }))

export default { productsRedirect, getProducts }
