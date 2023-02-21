const socketClient = io('http://localhost:8080')
const usernameValue = document.getElementById('username')
const messagesContainer = document.getElementById('messagesContainer')

async function postMessage(event, name, username) {
    event.preventDefault()
    
    const chatInputValue = document.getElementById('chatInput')
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

    dataToSave = { name: name, username: username, text: chatInputValue.value, timestamp: currentTime }

    if (chatInputValue !== '') {
        chatInputValue.value = ''

        const data = await fetch(`http://localhost:8080/chat`, 
        { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        })
        .then(response => response.json())
        .then(json => socketClient.emit("newMessage"))
    
        data.message === 'Query successfully resolved' && window.location.reload()
    }
}

socketClient
    .on("loadMessages", (data) => {
        messagesContainer.innerHTML = ''
        console.log('Cargar mensajes:', data);

        if (data.lenght !== 0) {
            data.forEach(item => {
                messagesContainer.innerHTML += `<li class="message__container ${item.username === usernameValue.textContent ? 'ownMessage' : ''}">
                                                    <div class="message__container--firstrow">
                                                        <p>${item.name}</p>
                                                        <p>@${item.username}</p>
                                                    </div>
                                                    <div class="message__container--secondrow">
                                                        <p>${item.text}</p>
                                                        <p>${item.timestamp}</p>
                                                    </div>
                                                </li>`
            });
        }
    })

