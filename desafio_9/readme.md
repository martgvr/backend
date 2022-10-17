# Desafio 9: MongoDB

## Terminal servidor

```
mongod --dbpath "<path base de datos>"
```

## Terminal cliente
Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

```
mongosh
use ecommerce
db.createCollection("productos")
db.createCollection("mensajes")
```

### Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.

```
db.productos.insertMany([
    {
        title: "Regla económica 15 cm",
        price: 120,
        thumbnail: "https://sifer.com.ar/wp-content/uploads/2020/03/REGLA-ECONM_15-CM.-600x600.jpg"
    },
    {
        title: "Corrector Liquid Paper",
        price: 550,
        thumbnail: "https://libreriaslevalle.com/1349-home_default/lapiz-corrector-liquid-paper.jpg"
    },
    {
        title: "Bibliorato A4 lomo ancho",
        price: 900,
        thumbnail: "https://www.laeditorial.com.ar/17327-large_default/bibliorato-the-pel-a4-palanca-baja-color-pastel.jpg"
    },
    {
        title: "Repuesto hojas cuadriculadas",
        price: 1280,
        thumbnail: "https://tiendup.b-cdn.net/business/48/products/gyQKzg_5dfcfb03386b2_medium.jpg"
    },
    {
        title: "Tinta china para estilografo Rotring",
        price: 1700,
        thumbnail: "https://espapel.com.ar/wp-content/uploads/2018/02/tinta-estilografica-rotring-isograph-D_NQ_NP_435121-MLA20710429304_052016-F.jpg"
    },
    {
        title: "Corrugadora de papel y cartulina Ibi Craft",
        price: 2300,
        thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/145/589/products/ibi-craft-corrugadora-de-papel-11-4b12b52d5df6bcf3af16491681587144-1024-1024.jpeg"
    },
    {
        title: "Kit Escolar 16 articulos embolsados",
        price: 2860,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_742343-MLA48832532978_012022-O.jpg"
    },
    {
        title: "Tinta estilografica Monteverde x 30 ml",
        price: 3350,
        thumbnail: "https://casalalapicera.com/wp-content/uploads/product_images/29712-1000x1000.jpg"
    },
    {
        title: "Filgo Box Colorear Colorearte 9 Articulos",
        price: 4320,
        thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/398/366/products/box-filgo-colorear1-ed499ec3560031ffe616513236200240-480-0.jpg"
    },
    {
        title: "Tableta dibujo calcar tabla luz led A4 ",
        price: 4990,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_830047-MLA49076616439_022022-O.jpg"
    }
])
```

```
db.mensajes.insertMany([
    {
        name: "Juan",
        message: "Mensaje 1",
        timestamp: "1"
    },
    {
        name: "Jorge",
        message: "Mensaje 2",
        timestamp: "2"
    },
    {
        name: "María",
        message: "Mensaje 3",
        timestamp: "3"
    },
    {
        name: "Osvaldo",
        message: "Mensaje 4",
        timestamp: "4"
    },
    {
        name: "Sandra",
        message: "Mensaje 5",
        timestamp: "5"
    },
    {
        name: "Belén",
        message: "Mensaje 6",
        timestamp: "6"
    },
    {
        name: "Mario",
        message: "Mensaje 7",
        timestamp: "7"
    },
    {
        name: "Ricardo",
        message: "Mensaje 8",
        timestamp: "8"
    },
    {
        name: "Ernesto",
        message: "Mensaje 9",
        timestamp: "9"
    },
    {
        name: "Javier",
        message: "Mensaje 10",
        timestamp: "10"
    }
])
```

### Listar todos los documentos en cada colección

```
db.productos.find()
db.mensajes.find()
```

### Mostrar la cantidad de documentos almacenados en cada una de ellas

```
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()
```

### Realizar un CRUD sobre la colección productos

a) Agregar un producto más en la colección de productos

```
db.productos.insertOne({
    title: "Escalímetro Plantec",
    price: 780,
    thumbnail: "https://libreriatopogigio.com/wp-content/uploads/2021/05/dozent-Miniescalimetro-Plantec-De-10cm-Escalas-Bajas-Con-estuche-14510.jpg"
})
```

b) Realizar una consulta por nombre de producto específico.

```
db.productos.find({title: "Corrector Liquid Paper"})
```

i) Lista los productos con precio menor a 1000 pesos.

```
db.productos.find({ price: {$lt: 1000} })
```

ii) Listar los productos con precio entre los 1000 a 3000 pesos.

```
db.productos.find({ $and: [{price: {$gt: 1000}}, {price: {$lt: 3000}}] })
```

iii) Listar los productos con precio mayor a 3000 pesos.

```
db.productos.find({ price: {$gt: 3000} })
```

iv) Realizar una consulta que traiga solo el nombre del tercer producto más barato.

```
db.productos.find({}, {_id: 0, title: 1}).sort({price: 1}).skip(2).limit(1)
```

### Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```
db.productos.updateMany({}, { $set: {stock: 100} })
```

### Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

```
db.productos.updateMany({ price: {$gt: 4000} }, { $set: {stock: 0} })
```

### Borrar los productos con precio menor a 1000 pesos.
```
db.productos.deleteMany({ price: {$lt: 1000} })
```

### Crear usuario 'pepe' clave 'asd456' que solo pueda leer la base de datos ecommerce.

```
use admin
db.createUser({ user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecommerce" }] })
```
<hr><br>

## Terminal Servidor
Cierro el servidor y lo vuelvo a iniciar con el control de acceso habilitado:

```
mongod --auth --dbpath "<path base de datos>"
```

## Terminal cliente
Inicio sesión con:

```
mongosh -u pepe -p asd456
```