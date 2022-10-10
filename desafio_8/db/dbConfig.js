import knex from 'knex';

export const mysql = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'knex_mysql'
    }
})

export const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: './db/knex_sqlite.sqlite'
    }
})