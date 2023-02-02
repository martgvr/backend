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
            return data !== null ? data : { cartID: 'El carrito no existe' };
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async addItemToCart(cartID, itemID, itemName, itemPrice, itemPhoto) {
        try {
            const data = await this.model.findOneAndUpdate({ cartID: cartID }, { $push: { products: { itemID: itemID, itemName: itemName, itemPrice: itemPrice, itemPhoto: itemPhoto } } })
            return data
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async clearCart(cartID) {
        try {
            const data = await this.model.findOneAndUpdate({ cartID: cartID }, { $set: { products: [] } })
            return data
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
}