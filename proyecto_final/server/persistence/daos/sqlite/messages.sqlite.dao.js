import SQLiteContainer from '../../containers/sqlite.container.js'

export default class MessagesSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'messages')
    }
}
