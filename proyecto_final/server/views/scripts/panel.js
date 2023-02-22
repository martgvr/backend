// PRODUCTS

async function productClickHandler(productID) {
    const getActives = document.getElementsByClassName('user__selected')
    getActives.length > 0 && getActives[0].classList.remove('user__selected')
    document.getElementById(`${productID}`).classList.add('user__selected')

    const data = await fetch(`http://localhost:8080/products/${productID}`).then(response => response.json())
    
    document.getElementById('productID').value = data.data._id
    document.getElementById('productName').value = data.data.name
    document.getElementById('productPrice').value = data.data.price
    document.getElementById('productPhoto').value = data.data.photo

    document.getElementById('productHandlerButton').innerText = 'Actualizar producto'
}

async function updateProductHandler() {
    const productID = document.getElementById('productID').value

    let newData = {}
    newData.name = document.getElementById('productName').value
    newData.price = document.getElementById('productPrice').value
    newData.photo = document.getElementById('productPhoto').value

    if (productID !== '') {
        const data = await fetch(`http://localhost:8080/products/${productID}`, 
            { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(newData) 
            })
            .then(response => response.json())

        data.message === 'Query successfully resolved' && window.location.reload()
        alertify.success('Producto actualizado de forma exitosa')
    } else {
        const data = await fetch(`http://localhost:8080/products`, 
            { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            })
            .then(response => response.json())
        
            data.message === 'Query successfully resolved' && window.location.reload()
            alertify.success('Producto agregado de forma exitosa')
    }
}

async function deleteProductHandler() {
    const productID = document.getElementById('productID').value

    if (productID !== '') {
        const data = await fetch(`http://localhost:8080/products/${productID}`, { method: 'DELETE' })
        .then(response => response.json())
        data.message === 'Query successfully resolved' && window.location.reload()
        alertify.success('Producto eliminado de forma exitosa')
    }
}

function productCleanHandler(event) {
    event.preventDefault()
    document.getElementById('productID').value = ''
    document.getElementById('productName').value = ''
    document.getElementById('productPrice').value = ''
    document.getElementById('productPhoto').value = ''
    document.getElementById('productHandlerButton').innerText = 'Agregar producto'
    const getActives = document.getElementsByClassName('user__selected')
    getActives.length > 0 && getActives[0].classList.remove('user__selected')
}

// CARTS
function cartClickHandler(cartID, cartProducts, cartTotal) {
    const getActives = document.getElementsByClassName('user__selected')
    getActives.length > 0 && getActives[0].classList.remove('user__selected')
    document.getElementById(`${cartID}`).classList.add('user__selected')

    document.getElementById('cartID').value = `${cartID}`
    document.getElementById('cartProducts').value = `${cartProducts}`
    document.getElementById('cartTotal').value = `$ ${cartTotal}`
}

async function clearCartHandler(event) {
    event.preventDefault()
    const cartID = document.getElementById('cartID').value

    if (cartID !== '') {
        const data = await fetch(`http://localhost:8080/carts/${cartID}`, { method: 'DELETE' })
        .then(response => response.json())
        data.message === 'Query successfully resolved' && window.location.reload()
        alertify.success('Carrito vaciado de forma exitosa')
    }
}

// USERS

async function userClickHandler(username) {
    const getActives = document.getElementsByClassName('user__selected')
    getActives.length > 0 && getActives[0].classList.remove('user__selected')
    document.getElementById(`user__${username}`).classList.add('user__selected')

    const data = await fetch(`http://localhost:8080/users/${username}`).then(response => response.json())

    document.getElementById('username').value = username
    document.getElementById('email').value = data.email
    document.getElementById('cart').value = data.cartID
    document.getElementById('name').value = data.name
    document.getElementById('address').value = data.address
    document.getElementById('age').value = data.age
    document.getElementById('areacode').value = data.areacode
    document.getElementById('telephone').value = data.telephone
    document.getElementById('checkbox').checked = data.admin === 1 ? true : false
}

async function updateUserHandler() {
    const usernameInput = document.getElementById('username').value
    
    if (usernameInput !== '') {
        const newData = { }

        newData.email = document.getElementById('email').value
        newData.name = document.getElementById('name').value
        newData.address = document.getElementById('address').value
        newData.age = document.getElementById('age').value
        newData.areacode = document.getElementById('areacode').value
        newData.telephone = document.getElementById('telephone').value
        newData.admin = document.getElementById('checkbox').checked == true ? 1 : 0

        const data = await fetch(`http://localhost:8080/users/${usernameInput}`, 
        { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(newData) 
        })
        .then(response => response.json())

        data.message === 'Query successfully resolved' && window.location.reload()
        alertify.success('Usuario actualizado de forma exitosa')
    }
}