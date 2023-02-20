import { productsDAO } from "../persistence/daos/factory.js"

export default class ProductsController {
    productsRedirect = async (req,res) => res.redirect('/products')
    
    saveData = async (req, res) => res.send(await productsDAO.save(req.body))
    getByID = async (req, res) => res.send(await productsDAO.getByID(req.params.productid))
    deleteByID = async (req, res) => res.send(await productsDAO.deleteProduct(req.params.productid))
    updateByID  = async (req, res) => res.send(await productsDAO.updateProduct(req.params.productid, req.body))
    getData = async (req,res) => productsDAO.getAll().then(data => res.render('products', { user: req.user, data: data.data }))
}