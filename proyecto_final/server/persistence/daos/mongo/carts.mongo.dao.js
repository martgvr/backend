import MongoContainer from '../../containers/mongo.container.js'
import { cartModel } from '../../models/mongo/carts.mongo.model.js'

export default class CartMongoDAO extends MongoContainer {
    constructor() {
        super(cartModel)
    }

    async findCartByID(id) {
        try {
            const data = await this.model.findOne({ cartID: id })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async addItemToCart(cartID, productID) {
        try {
            const data = await this.model.findOneAndUpdate({ cartID: cartID }, { $push: { products: productID } }, { new: true })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async clearCart(cartID) {
        try {
            const data = await this.model.findOneAndUpdate({ cartID: cartID }, { $set: { products: [] } })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}