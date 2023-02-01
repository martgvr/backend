import { productsDAO } from '../persistence/daos/factory.js'

class ProductsController {
    productsRedirect = async (req,res) => res.redirect('/products')

    async getProducts() {
        try {
            return productsDAO.getAll()
        } catch (error) {
            return 'Something went wrong'
        }
    }

    async createProduct(object) {
        try {
            return productsDAO.save(object)
        } catch (error) {
            return 'Something went wrong'
        }
    }
}

export const productsController = new ProductsController()