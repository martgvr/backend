import { cartsController } from '../controllers/carts.controller.js'
import { productsController } from '../controllers/products.controller.js'
import { usersController } from '../controllers/users.controller.js'

export const resolvers = {
    Query: {
        getProducts: async () => {
            return productsController.getProducts()
        }
    },

    Mutation: {
        createProduct: async (object) => {
            return productsController.createProduct(object)
        }
    }
}