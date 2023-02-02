# Repository usage

## How to use this repository
To start using this repository execute one of the following commands

```
$ npm start
```
```
$ npm test
```

## Environment Variables
An environment file (.env) should be placed at the repository's root folder

```
MONGO_URL = ''
SECRET_KEY = ''
CLUSTER = [true | false]
PORT = [number]
DAO = [file | mongo]
ADMIN_EMAIL = ''
NODEMAILER_USER = ''
NODEMAILER_PASS = ''
```

## GraphQL usage

### CARTS

```
query {
  getCarts { cartID }
}

query {
  getCartByID(id: "604"){
		cartID
    total
    products { itemID itemName itemPrice itemPhoto }
  }
}

mutation {
  postCart(input: { 
    cartID: "604" 
    itemID: "1" 
    itemName: "Producto de prueba"
    itemPrice: "1000"
    itemPhoto: "http://"
  }) {
    message
  }
}
```

### PRODUCTS
```
query {
  getProducts { id name price photo }
}

mutation {
  createProduct(input:{ name: "Producto prueba", price: 500, photo: "http://" }) {
    id name price photo
  }
}
```