import SQLiteContainer from '../../containers/sqlite.container.js'

export default class UsersSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'users')
    }

    async findUser(id) {
        try {
            const data = await this.db.from(this.table).select('*').where('id', id)
            return data[0]
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async findByUsername(username) {
        try {
            const data = await this.db.from(this.table).select('*').where('username', username)
            return data[0]
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async updateUser() {
        return 'ok'
    }
}