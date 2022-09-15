const hbs = require('express-handlebars');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'layout1.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // res.render('index', { layout: 'layout2.hbs' });
    res.render('index');
});

app.get('/main', (req, res) => {
    const { nombre, apellido, deporte } = req.query;
    // res.render('main')
    // res.render('main', { nombre: nombre, apellido: apellido, render: true })
    res.render('main', { nombre, apellido, deporte, render: true })
})

const PORT = process.env.PORT || 8082;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));