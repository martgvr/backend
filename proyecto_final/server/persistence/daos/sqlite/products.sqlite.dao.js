import SQLiteContainer from '../../containers/sqlite.container.js'

export default class ProductsSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'products')
    }

    async getByCategory(category) {
        try {
            const data = await this.db.from(this.table).select('*').where('category', category)
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async updateProduct(productID, req) {
        for (const key in req) {
            if (key !== 'productID') {
                try {
                    await this.db.from(this.table).select('*').where('id', productID).update(key, req[key])
                } catch (error) {
                    return { error: 'Something went wrong' }
                }
            }
        }
        return { message: 'Query successfully resolved' }
    }

    async deleteProduct(productID) {
        try {
            const data = await this.db.from(this.table).select('*').where('id', productID).del()
            return { message: 'Query successfully resolved' }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}