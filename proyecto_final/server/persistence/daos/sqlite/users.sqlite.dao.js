import SQLiteContainer from '../../containers/sqlite.container.js'

export default class UsersSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'users')
    }

    async findUser(userID) {
        try {
            const data = await this.db.from(this.table).select('*').where('id', userID)
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async updateUser() {
        return 'ok'
    }
}