// import { usersController } from '../controllers/users.controller.js'
import { cartsController } from '../controllers/carts.controller.js'
import { productsController } from '../controllers/products.controller.js'

export const resolvers = {
    Query: {
        getProducts: async () => productsController.getProducts(),
        getCarts: async () =>  cartsController.getCarts(),
        getCartByID: async (_, {id}) => cartsController.getCartByID(id)
    },

    Mutation: {
        createProduct: async (_, { input }) => productsController.createProduct(input)
    }
}