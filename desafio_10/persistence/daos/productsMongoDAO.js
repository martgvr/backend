import { MongoContainer } from '../containers/MongoContainer.js'
import { productsModel } from '../models/productsModel.js'

class ProductsMongoDAO extends MongoContainer {
    constructor() {
        super(productsModel)
    }
}

export default ProductsMongoDAO