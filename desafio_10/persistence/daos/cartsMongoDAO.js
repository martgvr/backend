import MongoContainer from '../containers/MongoContainer.js'
import { cartsModel } from '../models/cartsModel.js'

class CartsMongoDAO extends MongoContainer {
    constructor() {
        super(cartsModel)
    }
}

export default CartsMongoDAO