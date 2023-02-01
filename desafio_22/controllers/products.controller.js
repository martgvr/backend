import { productsDAO } from '../persistence/daos/factory.js'

class ProductsController {
    productsRedirect = async (req,res) => res.redirect('/products')

    async getProducts() {
        try {
            let response = productsDAO.getAll().then(data => response = data)
            return response
        } catch (error) {
            return 'Something went wrong'
        }
    }

    async createProduct(object) {
        try {
            let response = productsDAO.save(object).then(data => response = data)
            return response
        } catch (error) {
            return 'Something went wrong'
        }
    }
}

export const productsController = new ProductsController()