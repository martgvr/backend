const socketClient = io('http://localhost:8080');

const messagesContainer = document.getElementById('messagesContainer');
const messagesForm = document.getElementById('messagesForm');

const messageMail = document.getElementById('messageMail');
const messageNombre = document.getElementById('messageNombre');
const messageApellido = document.getElementById('messageApellido');
const messageEdad = document.getElementById('messageEdad');
const messageAlias = document.getElementById('messageAlias');
const messageAvatar = document.getElementById('messageAvatar');
const messageTexto = document.getElementById('messageTexto');

messagesForm.onsubmit = (e) => {
    e.preventDefault();
    const msgObject = {
        author: {
            id: messageMail.value,
            nombre: messageNombre.value,
            apellido: messageApellido.value,
            edad: messageEdad.value,
            alias: messageAlias.value,
            avatar: messageAvatar.value
        },
        text: messageTexto.value,
        timestamp: new Date().toLocaleString()
    }

    socketClient.emit("newMessage", msgObject);
    messageTexto.value = "";
};

socketClient
    .on("loadMessages", (messages) => {
        loadMessages(messages);
    })

function loadMessages(messages) {
    console.log('Cargar mensajes normalizdos:', messages);
}
