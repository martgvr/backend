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


    async updateByUsername(username, newData) {
        try {

            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async deleteByUsername(username) {
        try {

            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}