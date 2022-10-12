const socketClient = io('http://localhost:8080');

const productsTable = document.getElementById('productsTable');

const messagesContainer = document.getElementById('messagesContainer');
const messagesForm = document.getElementById('messagesForm');
const messageName = document.getElementById('messageName');
const messageText = document.getElementById("messageText");

// CONTROL DE FORMULARIOS
messagesForm.onsubmit = (e) => {
    e.preventDefault();
    const name = messageName.value;
    const message = messageText.value;
    const timestamp = new Date().toLocaleString();

    socketClient.emit("newMessage", { name, message, timestamp });
    messageText.value = "";
};

// EVENTOS PROVENIENTES DEL SERVIDOR
socketClient
    .on("loadMessages", (messages) => {
        loadMessages(messages);
        scrollBottom();
    })

    .on("loadProducts", (products) => {
        loadProducts(products);
    });

    
// FUNCIONES
function sendMessage(event) {
    event.preventDefault();
}

function loadMessages(messages) {
    const inner = messages.map((message) => {
        return `    <li>
                        <div class="mensajeContainer">
                            <div class="nick">
                                <p style="color: blue">${message.name}</p><p style="color: brown">[${message.timestamp}]:</p><p style="color: green">${message.message}</p>
                            </div>
                        </div>
                    </li>`;

    }).join(" ");
    messagesContainer.innerHTML = inner;
}

function scrollBottom() {
    messagesContainer.scroll({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
}

function loadProducts(products) {
    const inner = products.map((item) => {
        return `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td><img src="${item.thumbnail}" /></td>
                </tr>
                `;
    }).join(" ");
    productsTable.innerHTML = inner;
}
