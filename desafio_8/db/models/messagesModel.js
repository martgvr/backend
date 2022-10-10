import { messages_Config, messages_Server as db } from '../dbConfig.js'

(async function() {
    try {
        const isTable = await db.schema.hasTable(messages_Config.table);
        if (!isTable) {
            await db.schema.createTable(messages_Config.table, (table) => {
                table.increments('id').primary().notNullable();
                table.string('name').notNullable();
                table.string('message').notNullable();
                table.string('timestamp').notNullable();
            })
            console.log('Tabla de mensajes creada con éxito en SQLite.');
        } else {
            console.log('La tabla de mensajes en SQLite ya existe.');
        }
    } catch (error) {
        console.log(error);
    }
})()