// MONGODB
import mongoose from "mongoose";
import { mongoProducts, mongoCarts } from './contenedorMongo.js'

async function dbConnect() {
    const URL = 'mongodb+srv://admin:mongodb123456@cluster0.vpzccsu.mongodb.net/atlasMongoose?retryWrites=true&w=majority'

    mongoose.connect(URL)
    mongoose.connection.on('open', () => console.log(`Base de datos conectada`))
    mongoose.connection.on('error', (e) => console.log(e))

    // -------------------------
    // PASAR TODO ESTO A ROUTES
    // -------------------------

    // LEER TODO
    // mongoProducts.getAll().then(response => console.log(response))

    // GUARDAR PRODUCTO
    // mongoProducts.save(productToSave).then(response => console.log(response))

    // const productsToSave = [
    //     { name: 'iPad', price: 500, stock: 10 },
    //     { name: 'iPhone', price: 900, stock: 15 },
    //     { name: 'MacBook Pro', price: 1200, stock: 5 }
    // ]

    // productsToSave.map(product => {
    //     mongoProducts.save(product).then(response => console.log(response))
    // })


    // LEER POR ID
    // mongoProducts.getByID("6359720c390f4129491746c9").then(response => console.log(response))

    // BORRAR POR ID
    // mongoProducts.deleteByID("63596ef5bc5a2fd92d806e0c").then(response => console.log(response))

    // BORRAR TODO
    // mongoProducts.deleteAll();

    // ACTUALIZAR
    // mongoProducts.update({ name: 'iPhone' }, { price: 5000 })
    // mongoProducts.update({ name: 'iPhone' }, { stock: 1 })
}

try {
    console.log('Conectando a mongoDB...');
    await dbConnect()

} catch (error) {
    console.log(error);
}