// FUNCTIONS
function createComponent(type, classname, idname, innerhtml, idtoappend) {
    const element = document.createElement(type);
    element.setAttribute('class', classname);
    element.setAttribute('id', idname);
    element.innerHTML = innerhtml;
    document.getElementById(idtoappend).appendChild(element);
}

// GET & SHOW PRODUCTS
(function getProducts() {
    const URL = 'http://localhost:8080/api/productos/';
    fetch(URL).then(data => data.json()).then(res => {
        if (res.length != 0) {
            res.map(item => {
                const cardToInner = `
                                        <div class="card__image" style="background-image: url(${item.thumbnail})"></div>
                                        <div class="card__description">
                                            <p>${item.title}</p>
                                            <p>Precio: ${item.price}</p>
                                            <p>ID: ${item.id}</p>
                                        </div>
                                        `
                createComponent('article', 'card', '', cardToInner, 'cardsContainer');
            })
        } else {
            console.log('No hay productos');
        }
    })
})();

// GENERATE & SHOW CART
let cartID = null;
(function generateCart() {
    const fetchURL = 'http://localhost:8080/api/carrito/';
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ 'admin': true })
    }
    fetch(fetchURL, fetchOptions).then(data => data.json()).then(res => cartID = res.id)
})();

const getProductsByCart = (id) => {
    document.getElementById('cartList').innerHTML = '';
    const fetchURL = `http://localhost:8080/api/carrito/${id}/productos/`;
    fetch(fetchURL).then(data => data.json()).then(res => {
        if (res.error) {
            createComponent('div', 'product', '', 'Carrito no encontrado', 'cartList');
        } else {
            if (res.length == 0) {
                createComponent('div', 'product', '', 'No hay items en el carrito', 'cartList');
            } else {
                res.map(product => {
                    createComponent('div', 'product', '', product.nombre, 'cartList');
                })
            }
        }
    })
}

document.getElementById('cartButton').addEventListener('click', () => {
    if (document.getElementById('cartContainer') == null) {
        cartToInner = `
                    <article class="cart__header">
                        <div class="cart__header--title">Carrito [ID: ${cartID}]</div>
                        <div class="cart__header--button" id="cartCloseButton">X</div>
                    </article>
                    <article class="cart__list" id="cartList">Lista</article>
                    `

        createComponent('section', 'cart__container', 'cartContainer', cartToInner, 'body');
        cartButton.setAttribute('class', 'active');
        getProductsByCart(cartID);

        const cartCloseButton = document.getElementById('cartCloseButton');
        cartCloseButton.addEventListener('click', () => {
            document.getElementById('cartContainer').remove();
            cartButton.removeAttribute('class');
        })
    }
})

// ADD PRODUCT
const addProductsButton = document.getElementById('addProductsButton');

addProductsButton.addEventListener('click', () => {
    const addProductModal = document.getElementById('addProductModal');
    if (addProductModal == null) {
        addProductsButton.setAttribute('class', 'active');
        addProductsInner =  `
                            <article class="addProduct__modal" id="addProductModal">
    
                                <div class="addProduct__modal--header">
                                    <p>Agregar producto</p>
                                    <button id="closeModalButton">X</button>
                                </div>
    
                                <div class="addProduct__modal--content">
                                    <div class="form__container">
                                        <form action="/api/productos" method="post" id="formProductos">
                                            <div>
                                                <label for="title">Nombre</label>
                                                <input type="text" name="title" id="title" />
                                            </div>
                                            <div>
                                                <label for="price">Precio</label>
                                                <input type="text" name="price" id="price" />
                                            </div>
                                                <div>
                                                <label for="thumbnail">Foto URL</label>
                                                <input type="text" name="thumbnail" id="thumbnail" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
    
                                <div class="addProduct__modal--footer">
                                    <button>Cancelar</button>
                                    <input type="submit" value="Añadir producto" id="addProductBtn"/>
                                </div>
                            </article>
                            `;

        createComponent('section', 'addProduct__container', 'addProductContainer', addProductsInner, 'body');

        const closeModalButton = document.getElementById('closeModalButton');
        const addProductContainer = document.getElementById('addProductContainer');
        
        closeModalButton.addEventListener('click', () => {
            addProductContainer.remove();
            addProductsButton.removeAttribute('class', 'active');
        })
    }
})