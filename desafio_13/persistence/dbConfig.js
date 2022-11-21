import mongoose from "mongoose";

const URL = `mongodb+srv://root:rootmongo123456@cluster0.vpzccsu.mongodb.net/dbPassport?retryWrites=true&w=majority`

console.log('Conectando a MongoDB...');

mongoose.connect(URL)
mongoose.connection.on('open', () => console.log(`Conectado a MongoDB`))
mongoose.connection.on('error', (e) => console.log(e))
