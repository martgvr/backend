import MongoContainer from '../../containers/MongoContainer.js'
import { productsModel } from '../../models/products.model.js'

export default class ProductsMongoDAO extends MongoContainer {
    constructor() {
        super(productsModel)
    }
}