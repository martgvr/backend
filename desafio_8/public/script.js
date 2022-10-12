const socketClient = io('http://localhost:8080');

const messagesContainer = document.getElementById('messagesContainer');
const messagesForm = document.getElementById('messagesForm');
const messageName = document.getElementById('messageName');
const messageText = document.getElementById("messageText");

const productsTable = document.getElementById('productsTable');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productThumbnail = document.getElementById('productThumbnail');


messagesForm.onsubmit = (e) => {
    e.preventDefault();
    const name = messageName.value;
    const message = messageText.value;
    const timestamp = new Date().toLocaleString();
    socketClient.emit("newMessage", { name, message, timestamp });
    messageText.value = "";
};

productsForm.onsubmit = (e) => {
    e.preventDefault();
    const title = productTitle.value;
    const price = productPrice.value;
    const thumbnail = productThumbnail.value;
    socketClient.emit("newProduct", { title, price, thumbnail });
    productTitle.value = "";
    productPrice.value = "";
    productThumbnail.value = "";
}

socketClient
    .on("loadMessages", (messages) => {
        loadMessages(messages);
        scrollBottom();
    })

    .on("loadProducts", (products) => {
        console.log(products);
        loadProducts(products);
    });

    
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
    if (products.length > 0) {
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
    } else {
        productsTable.innerHTML = '<div class="noProducts">No hay productos en la base de datos</div>';
    }
}
