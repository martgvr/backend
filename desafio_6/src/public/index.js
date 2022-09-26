const socketClient = io();

const formProductos = document.getElementById('formProductos');
const formulario = document.getElementById("formulario");
const productos = document.getElementById('productos');
const inputNombre = document.getElementById('name');
const inputInfo = document.getElementById("info");
const lista = document.getElementById("lista");

formulario.onsubmit = (e) => {
    e.preventDefault();
    const info = inputInfo.value;
    const nombre = inputNombre.value;
    const obj = { nombre, info }

    socketClient.emit("mensaje", obj);
    inputInfo.value = "";
};

formProductos.onsubmit = (e) => {
    socketClient.emit("actualizarProductos");
    console.log('actualizarProductos');
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
                            <div class="nick">${mensaje.nombre}: ${mensaje.info}</div>
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
