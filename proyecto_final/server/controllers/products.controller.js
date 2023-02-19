import { productsDAO } from "../persistence/daos/factory.js"

export default class ProductsController {
    productsRedirect = async (req,res) => res.redirect('/products')
    saveNewProduct = async (req, res) => res.send(await productsDAO.save(req.body))
    getProductByID = async (req, res) => res.send(await productsDAO.getByID(req.params.productid))
    DeleteProduct = async (req, res) => res.send(await productsDAO.deleteProduct(req.params.productid))
    updateProductByID  = async (req, res) => res.send(await productsDAO.updateProduct(req.params.productid, req.body))

    getProducts = async (req,res) => {
        try {
            productsDAO.getAll().then(data => {
                res.render('products', { user: req.user, data: data.data }
            )})
        } catch (error) {
            res.send('Something went wrong')
        }
    }
}