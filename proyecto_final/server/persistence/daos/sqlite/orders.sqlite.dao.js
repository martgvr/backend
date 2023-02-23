import SQLiteContainer from '../../containers/sqlite.container.js'

export default class OrdersSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'orders')
    }
}
