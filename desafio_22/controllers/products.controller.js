import { productsDAO } from '../persistence/daos/factory.js'

class ProductsController {
    productsRedirect = async (req,res) => res.redirect('/products')

    async getProducts() {
        try {
            productsDAO.getAll().then(response => response)
        } catch (error) {
            return 'Something went wrong'
        }
    }

    async createProduct(object) {
        try {
            productsDAO.save(object).then(response => response)
        } catch (error) {
            return 'Something went wrong'
        }
    }
}

export const productsController = new ProductsController()