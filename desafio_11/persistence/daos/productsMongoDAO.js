import MongoContainer from '../containers/MongoContainer.js'
import { productsModel } from '../models/productsModel.js'
import { mockProducts } from '../../utils/mocks.js'

class ProductsMongoDAO extends MongoContainer {
    constructor() {
        super(productsModel)
    }

    async populate(cant) {
        const products = mockProducts(cant);
        products.forEach(async item => await this.save(item))
        return({msg: `Intentando crear: ${cant} productos`});
    }
}

export default ProductsMongoDAO