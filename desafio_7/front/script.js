function createComponent(type, classname, idname, innerhtml, idtoappend) {
    const element = document.createElement(type);
    element.setAttribute('class', classname);
    element.setAttribute('id', idname);
    element.innerHTML = innerhtml;
    document.getElementById(idtoappend).appendChild(element);
}

const getProducts = () => {
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
}

getProducts();