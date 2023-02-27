import knex from 'knex'

export default class SQLiteContainer {
    constructor(client, filename, table) {
        this.table = table;
        this.filename = filename;
        this.db = knex({ client: client, connection: { filename: filename }, useNullAsDefault: true })
    }

    async save(obj) {
        try {
            const elementCreated = await this.db.from(this.table).insert(obj)
            return { message: 'Query successfully resolved', tabla: this.table, id: elementCreated }
        } catch (error) {
            return { error: 'Something went wrong', error }
        }
    }
    
    async getAll() {
        try {
            const data = await this.db.from(this.table).select('*')
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong', error }
        }
    }

    async getByID(id) {
        try {
            const data = await this.db.from(this.table).select('*').where('id', id)
            const dataReturned = data[0]
            return { message: 'Query successfully resolved', data: dataReturned }
        } catch (error) {
            return { error: 'Something went wrong', error }
        }
    }

    async deleteByID(id) {
        try {
            const elementDeleted = await this.db.from(this.table).where('id', id).del()
            return { message: 'Query successfully resolved', table: this.table, id: elementDeleted }
        } catch (error) {
            return { error: 'Something went wrong', error }
        }
    }

    async deleteAll() {
        try {
            const elementDeleted = await this.db.from(this.table).del()
            return { message: 'Query successfully resolved', table: this.table, id: elementDeleted }
        } catch (error) {
            return { error: 'Something went wrong', error }
        }
    }

    async createTable(fields) {
        try {
            const isTable = await this.db.schema.hasTable(this.table)
            if (!isTable) {
                await this.db.schema.createTable(this.table, (table) => {
                    for (const field of fields) {
                        field.type === 'increments' && table.increments(field.name)
                        field.type === 'string' && table.string(field.name)
                        field.type === 'integer' && table.integer(field.name)
                    }
                })
                return { message: `Table ${this.table} created at: ${this.filename}`, tableName: this.table, tableStatus: 1 }
            } else {
                return { message: `Table ${this.table} already exists at ${this.filename}`, tableName: this.table, tableStatus: 1 }
            }
        } catch (error) {
            return { error: 'Something went wrong', tableName: this.table, tableStatus: 0, error }
        }
    }
}