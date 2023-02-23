import MongoContainer from '../../containers/mongo.container.js'
import { ordersModel } from '../../models/mongo/orders.mongo.model.js'

export default class OrdersMongoDAO extends MongoContainer {
    constructor() {
        super(ordersModel)
    }
    
    async updateOrder(orderID, newValue) {
        try {
            const data = await this.model.updateOne({_id: orderID}, { $set: newValue }, { new: true })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}