import { products_Config, products_Server as db } from '../dbConfig.js'

(async function() {
    try {
        const isTable = await db.schema.hasTable(products_Config.table);
        if (!isTable) {
            await db.schema.createTable(products_Config.table, (table) => {
                table.increments('id').primary().notNullable();
                table.string('title').notNullable();
                table.integer('price').notNullable();
                table.string('thumbnail').notNullable();
            })
            console.log('Tabla de productos creada con éxito en MySQL.');
        } else {
            console.log('La tabla de productos en MySQL ya existe.');
        }
    } catch (error) {
        console.log(error);
    }
})()