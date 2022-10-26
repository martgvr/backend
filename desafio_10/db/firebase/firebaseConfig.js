import { firebaseProducts, firebaseCarts } from './contenedorFirebase.js'

firebaseProducts.getAll().then(response => console.log(response));
// firebaseCarts.getAll().then(response => console.log(response));

// const product1 = { price: 200, stock: 40, name: 'iPad' }
// firebaseProducts.save(product1);