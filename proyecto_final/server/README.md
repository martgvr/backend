# Endpoints usage

## Products

```
[POST]

Add product to database
/products

{
    "id": "",
    "name": "",
    "price": "",
    "photo": ""
}
```

```
[GET]

Get all products
/products

Get product by id
/products/:id
```

```
[PUT]

Update a product by id
/products/:id

{
    <props to update>
}
```

```
[DELETE]

Delete a product by id
/products/:id
```

## Carts

```
[POST]

Add item to a cart
/carts/:id

{
    "itemID": <number>, 
    "itemName": "", 
    "itemPrice": <number>, 
    "itemPhoto": ""
}
```

```
[GET]

Get all carts
/carts

Get cart by id
/carts/:id
```

```
[DELETE]

Delete all cart products by id
/carts/:id
```

## Messages

```
[GET]

Get all messages
/messages
```

```
[POST]

Add message to db
/messages

{
  "id": <number>,
  "author": "",
  "text": "",
  "timestamp": ""
}
```