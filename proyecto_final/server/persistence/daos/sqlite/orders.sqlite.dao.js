import SQLiteContainer from '../../containers/sqlite.container.js'

export default class OrdersSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'orders')
    }

    async updateOrder(orderID, newValue) {
        try {
            
            return { message: 'Query successfully resolved' }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}
