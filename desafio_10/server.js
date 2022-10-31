import express from 'express';
import { connect } from './persistence/dbConfig.js';

import cartsRoutes from './routes/cartsRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use('/messages', messagesRoutes);

const PORT = process.env.PORT || 8080;

try {
    await connect();
    app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));
} catch (error) {
    console.log(error);
}
