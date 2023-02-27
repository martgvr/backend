import SQLiteContainer from '../../containers/sqlite.container.js'

export default class OrdersSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'orders')
    }

    async updateOrder(id, newValue) {
        try {
            const data = await this.db.from(this.table).select('*').where('id', id).update(newValue)
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}
