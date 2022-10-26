import admin from 'firebase-admin'
import { serviceAccount } from './serviceAccountKey.js'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const dbFirebase = admin.firestore()
const productsCollection = dbFirebase.collection('Products')

// --------
// COMANDOS
// --------

// LEER DB

try {
    const products = await productsCollection.get()
    const productosArray = products.docs.map(producto => {
        return { id: producto.id, stock: producto.data().stock, name: producto.data().name, price: producto.data().price }
    })
    console.log(productosArray);
} catch (error) {
    console.log(error);
}

// CREAR PRODUCTO

// const product1 = {
//     name: 'iPhone',
//     price: 500,
//     stock: 20
// }

// try {
//     await productsCollection.doc().create(product1)
//     console.log('Producto creado con éxito');
// } catch (error) {
//     console.log(error);
// }