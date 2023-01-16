import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`))