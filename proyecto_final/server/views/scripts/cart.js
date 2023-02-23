async function deleteItemHandler(itemID) {
    console.log('Eliminar del carrito:', itemID)
}

async function cleanCartHandler(cartID) {
    const data = await fetch(`http://localhost:8080/carts/${cartID}`, { method: 'DELETE' })
    .then(response => response.json())
    data.message === 'Query successfully resolved' && window.location.reload()
    alertify.success('Carrito vaciado de forma exitosa')
}

async function checkoutHandler() {
    console.log('Checkout de carrito')
}