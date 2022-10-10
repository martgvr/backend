import { mysql as db } from '../dbConfig.js'

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

            console.log('Tabla de productos creada con éxito en MySQL.');
        } else {
            console.log('La tabla de productos en MySQL ya existe.');
        }

    } catch (error) {
        console.log(error);
    }
})()