import express from 'express';
import productsRoutes from './routes/productsRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/products', productsRoutes);
app.use('/messages', messagesRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`))