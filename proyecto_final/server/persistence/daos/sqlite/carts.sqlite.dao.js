import SQLiteContainer from '../../containers/sqlite.container.js'

export default class CartsSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'carts')
    }

    async findCartByID(id) {
        try {
            const data = await this.db.from(this.table).select('*').where('cartID', id)
            const returnData = data[0]
            return { message: 'Query successfully resolved', data: returnData }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async addItemToCart(cartID, req) {
        const { itemID, itemName, itemPrice, itemPhoto } = req
        try {
            const contentCheck = await this.db.from(this.table).select('products').where('cartID', cartID)
            const contentParse = JSON.parse(contentCheck[0].products)
            contentParse.push({ itemID, itemName, itemPrice, itemPhoto })
            await this.db.from(this.table).select('*').where('cartID', cartID).update('products', JSON.stringify(contentParse))
            return { message: 'Query successfully resolved' }
        } catch (error) {
            console.log(error)
            return { error: 'Something went wrong' }
        }
    }

    async clearCart(cartID) {
        try {
            const data = await this.db.from(this.table).select('*').where('cartID', cartID).update('products', '[]')
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            console.log(error);
            return { error: 'Something went wrong' }
        }
    }
}