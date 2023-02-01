import MongoContainer from '../../containers/MongoContainer.js'
import { cartModel } from '../../models/carts.model.js'

export default class CartMongoDAO extends MongoContainer {
    constructor() {
        super(cartModel)
    }

    async getCarts() {
        try {
            const data = await this.model.find({})
            return data
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async findCartByID(id) {
        try {
            const data = await this.model.findOne({ cartID: id })
            if (data !== null) {
                return data;
            } else {
                return { error: 'El carrito no existe' }
            }
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async addItemToCart(cartID, productID) {
        try {
            const data = await this.model.findOneAndUpdate({ cartID: cartID }, { $push: { products: productID } })
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async clearCart(cartID) {
        try {
            const data = await this.model.findOneAndUpdate({ cartID: cartID }, { $set: { products: [] } })
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
}