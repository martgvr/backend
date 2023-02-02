import { cartsController } from '../controllers/carts.controller.js'
import { productsController } from '../controllers/products.controller.js'

export const resolvers = {
    Query: {
        getProducts: async () => productsController.getProducts(),
        getCarts: async () =>  cartsController.getCarts(),
        getCartByID: async (_, {id}) => cartsController.getCartByID(id),
        clearCart: async (_, {id}) => cartsController.clearCartByID(id)
    },

    Mutation: {
        createProduct: async (_, { input }) => productsController.createProduct(input),
        postCart: async (_, { input }) => cartsController.postCart(input),
        cartCheckout: async (_, { input }) => cartsController.cartCheckout(input)
    }
}