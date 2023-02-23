# Sobre el proyecto final

Este proyecto final ha sido creado para el curso de Backend de Coderhouse, utilizando las siguiente teconologías:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)

# Características del proyecto

- Vistas generadas desde el servidor utilizando EJS.
- Sistema de registro, login.
- Panel de administración de productos, carritos y usuarios.
- Creación automática de usuario administrador al iniciar servidor.
- Encriptado de contraseñas en base de datos utilzando Bcrypt.
- Envío de emails realizado con Nodemailer.

# What's next?

- Funcionamiento de botón para eliminar item y confirmar compra.
- Revisar funcionamiento de envío de mails.
- Agregar 2 variables de entorno ADMIM_USER y ADMIN_PASS.
- Al iniciar el servidor se creará ese usuario de administrador que permitirá acceder al panel de control.
- Revisar funcionamiento con ambas bases de datos, corregir DAO de SQLite.
- Detallar endpoints en esta documentación y agregar imagenes.

# Endpoints

## Products

```
POST
/products

{
  "name": "",
  "price": number,
  "photo": "",
  "category": ""
}

GET
/products
/products/:id

PUT
/products/:id

{
  "name": "",
  "price": number,
  "photo": "",
  "category": ""
}

DELETE
/products/:id

```

## Carts

```
POST
/carts
/carts/checkout

GET
/carts

DELETE
/carts/:id

```

## Orders

```
POST
/orders

{
  "products": "",
  "status": "",
  "timestamp": "",
  "orderEmail": "",
  "orderID": ""
}

GET 
/orders
/orders/:id

PUT
/orders/:id

{
  "products": "",
  "status": "",
  "timestamp": "",
  "orderEmail": "",
  "orderID": ""
}

DELETE
/orders/:id
/orders/all
```

## Users

```
GET
/users/:username

PUT
/users/:username
```