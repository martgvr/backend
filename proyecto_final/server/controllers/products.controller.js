import { productsDAO } from "../persistence/daos/factory.js"

export default class ProductsController {
    productsRedirect = (req,res) => res.redirect('/products')
    saveData = (req, res) => productsDAO.save(req.body).then(data => res.send(data))
    getByID = (req, res) => productsDAO.getByID(req.params.productid).then(data => res.send(data))
    deleteByID = (req, res) => productsDAO.deleteProduct(req.params.productid).then(data => res.send(data))
    updateByID  = (req, res) => productsDAO.updateProduct(req.params.productid, req.body).then(data => res.send(data))
    
    getData = async (req,res) => {
        const data = !req.query.category ? await productsDAO.getAll() : await productsDAO.getByCategory(req.query.category)
        res.render('products', { user: req.user, data: data.data })
    }
}