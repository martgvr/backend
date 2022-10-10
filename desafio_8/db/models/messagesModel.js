import { sqlite as db } from '../dbConfig.js'

(async function() {
    try {
        // Verificar si ya existe la tabla
        const isTable = await db.schema.hasTable('products');

        if (!isTable) {
            // Creo tabla
            await db.schema.createTable('products', (table) => {
                // Creo columnas
                table.increments('id').primary().notNullable();
                table.string('name').notNullable();
                table.integer('price').notNullable();
                table.integer('stock').notNullable();
            })

            console.log('Tabla de mensajes creada con éxito en SQLite.');
        } else {
            console.log('La tabla de mensajes en SQLite ya existe.');
        }

    } catch (error) {
        console.log(error);
    }
})()