const socketClient = io();

const formulario = document.getElementById("formulario");
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
};

async function getAll() {
    try {
        const response = await fs.promises.readFile('./src/productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) {
        return { error: true }
    }
}

socketClient
    .on("loadMessages", (mensajes) => {
        generarTexto(mensajes);
        // scrollBottom();
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