import MongoContainer from '../containers/MongoContainer.js'
import { cartModel } from '../models/cartModel.js'

class CartMongoDAO extends MongoContainer {
    constructor() {
        super(cartModel)
    }

    async findCartByID(id) {
        try {
            const data = await this.model.findOne({ cartID: id })
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async addItemToCart(cartID, productID) {
        console.log('productID:', productID);
        console.log('cartID:', cartID);
        const data = await this.model.findOne({ cartID: cartID })
        console.log(data);
    }
}

export default CartMongoDAO