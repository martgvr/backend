// LADO CLIENTE (BROWSER)
const socketClient = io();

const formProductos = document.getElementById('formProductos');
const formulario = document.getElementById("formulario");
const productos = document.getElementById('productos');
const inputNombre = document.getElementById('name');
const inputInfo = document.getElementById("info");
const lista = document.getElementById("lista");

// MANEJO FORMULARIO
formulario.onsubmit = (e) => {
    e.preventDefault();
    const info = inputInfo.value;
    const nombre = inputNombre.value;
    const obj = { nombre, info }

    socketClient.emit("mensaje", obj);
    inputInfo.value = "";
    socketClient.emit("actualizarProductos");
};

formProductos.onsubmit = (e) => {
    console.log('Hacer algo');
    socketClient.emit("actualizarProductos");
}


// EVENTOS PROVENIENTES DEL SERVIDOR
socketClient
    // Cargar mensajes de chat
    .on("loadMessages", (mensajes) => {
        generarTexto(mensajes);
        // scrollBottom();
    })

    // Cargar productos
    .on("loadProducts", (data) => {
        generarProductos(data);
    });

// FUNCIONES
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
        return  `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td><img src="${item.thumbnail}" /></td>
                </tr>
                `;
    }).join(" ");
    productos.innerHTML = inner;
}