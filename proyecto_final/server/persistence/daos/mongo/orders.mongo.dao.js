import MongoContainer from '../../containers/mongo.container.js'
import { ordersModel } from '../../models/mongo/orders.mongo.model.js'

export default class OrdersMongoDAO extends MongoContainer {
    constructor() {
        super(ordersModel)
    }
}