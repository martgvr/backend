import knex from 'knex';

class Contenedor {
    constructor(client, connection, table) {
        this.client = client;
        this.connection = connection;
        this.table = table;
    }

    async getAll() {
        const db = knex({ client: this.client, connection: this.connection });
        try {
            const data = await db.from(this.table).select('*');
            return data
        } catch (error) {
            console.log(error);
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
