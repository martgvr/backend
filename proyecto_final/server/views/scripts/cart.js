async function deleteItemHandler(itemID, cartID) {
    const data = await fetch(`http://localhost:8080/carts/${cartID}/${itemID}`, { method: 'DELETE' })
    .then(response => response.json())
    console.log(data);

    data.message === 'Query successfully resolved' && alertify.success('Item eliminado del carrito')
    setTimeout(() => window.location.reload(), 1000)
}

async function cleanCartHandler(cartID) {
    const data = await fetch(`http://localhost:8080/carts/${cartID}`, { method: 'DELETE' })
    .then(response => response.json())
    data.message === 'Query successfully resolved' && window.location.reload()
    alertify.success('Carrito vaciado de forma exitosa')
}

async function checkoutHandler() {
    await fetch(`http://localhost:8080/carts/checkout`, { method: 'POST' })
    alertify.success('Procesando compra')
    window.location.href = "http://localhost:8080/carts/success"
}