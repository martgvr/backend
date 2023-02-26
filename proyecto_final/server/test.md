# Mongo DAO

## findCartByID(cartID)

### Expected output

✓ If data exists

```
{
  "message": "Query successfully resolved",
  "data": {
    "_id": "",
    "cartID": "",
    "products": [
      {
        "itemID": "",
        "itemName": "",
        "itemPrice": "",
        "itemPhoto": ""
      }
    ],
    "total": 0,
    "__v": 0
  }
}
```

✓ If no data

```
{
  "message": "Query successfully resolved",
  "data": null
}
```

## removeCartItem(cartID, itemID)

### Expected output

If resolved

```

```


