const formProductos = document.getElementById('formProductos');
const formulario = document.getElementById("formulario");
const productos = document.getElementById('productos');
const inputNombre = document.getElementById('name');
const inputInfo = document.getElementById("info");
const lista = document.getElementById("lista");
const socketClient = io();

formulario.onsubmit = (e) => {
    e.preventDefault();
    const info = inputInfo.value;
    const nombre = inputNombre.value;
    const today = new Date();
    const fechayhora = today.toLocaleString();
    const obj = { nombre, info, fechayhora }

    socketClient.emit("mensaje", obj);
    inputInfo.value = "";
};

formProductos.onsubmit = (e) => {
    socketClient.emit("actualizarProductos");
}

socketClient
    .on("loadMessages", (mensajes) => {
        generarTexto(mensajes);
        scrollBottom();
    })

    .on("loadProducts", (data) => {
        generarProductos(data);
    });


function generarTexto(mensajes) {
    const inner = mensajes.map((mensaje) => {
        return `    <li>
                        <div class="mensajeContainer">
                            <div class="nick">
                                <p style="color: blue">${mensaje.nombre}</p><p style="color: brown">[${mensaje.fechayhora}]:</p><p style="color: green">${mensaje.info}</p>
                            </div>
                        </div>
                    </li>`;

    }).join(" ");
    lista.innerHTML = inner;
}

function generarProductos(data) {
    const inner = data.map((item) => {
        return `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td><img src="${item.thumbnail}" /></td>
                </tr>
                `;
    }).join(" ");
    productos.innerHTML = inner;
}

function scrollBottom() {
    lista.scroll({
        top: lista.scrollHeight,
        behavior: 'smooth'
    });
}
