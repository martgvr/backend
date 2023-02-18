import MongoContainer from '../../containers/mongo.container.js'
import { productsModel } from '../../models/mongo/products.mongo.model.js'

export default class ProductsMongoDAO extends MongoContainer {
    constructor() {
        super(productsModel)
    }

    async updateProduct(productToUpdate, newValue) {
        try {
            const data = await this.model.updateOne({_id: productToUpdate}, { $set: newValue })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async deleteProduct(productID) {
        try {
            const data = await this.model.deleteOne({ _id: productID })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}