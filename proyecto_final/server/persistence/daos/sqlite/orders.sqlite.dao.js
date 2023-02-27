import SQLiteContainer from '../../containers/sqlite.container.js'

export default class OrdersSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'orders')
    }

    async updateOrder(orderID, newValue) {
        try {
            const data = await this.db.from(this.table).select('*').where('orderID', orderID)
            console.log(data);
            return { message: 'Query successfully resolved' }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}
