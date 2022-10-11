import knex from 'knex';

class Contenedor {
    constructor(client, connection, table) {
        this.client = client;
        this.connection = connection;
        this.table = table;
        this.db = knex({ client: this.client, connection: this.connection });
    }

    async getAll() {
        try {
            const data = await this.db.from(this.table).select('*');
            return data
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async getByID(id) {
        try {
            const data = await this.db.from(this.table).select('*').where('id', id);
            return data
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async save(obj) {
        try {
            const elementCreated = await this.db.from(this.table).insert(obj);
            return { mensaje: 'Query resuelta exitosamente', tabla: this.table, id: elementCreated };
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async deleteByID(id) {
        try {
            const elementDeleted = await this.db.from(this.table).where('id', id).del()
            return { mensaje: 'Query resuelta exitosamente', tabla: this.table, id: elementDeleted };
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async deleteAll() {
        try {
            const elementDeleted = await this.db.from(this.table).del()
            return { mensaje: 'Query resuelta exitosamente', tabla: this.table, id: elementDeleted };
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
}

export const products_Config = new Contenedor(
    'mysql',
    {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'knex_mysql'
    },
    'products'
)

export const messages_Config = new Contenedor(
    'sqlite3',
    {
        filename: './db/messages.sqlite'
    },
    'messages'
)

export const products_Server = knex({ client: products_Config.client, connection: products_Config.connection });

export const messages_Server = knex({ client: messages_Config.client, connection: messages_Config.connection });
