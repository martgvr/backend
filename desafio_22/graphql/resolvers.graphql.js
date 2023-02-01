// import { cartsController } from '../controllers/carts.controller.js'
// import { usersController } from '../controllers/users.controller.js'
import { productsController } from '../controllers/products.controller.js'

export const resolvers = {
    Query: {
        getProducts: async () => {
            return productsController.getProducts()
        }
    },

    Mutation: {
        createProduct: async (_, { input }) => {
            return productsController.createProduct(input)
        }
    }
}