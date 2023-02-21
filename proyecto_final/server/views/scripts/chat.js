const socketClient = io('http://localhost:8080')

async function postMessage(event, name, username) {
    event.preventDefault()

    const chatInputValue = document.getElementById('chatInput')
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    console.log(currentTime);

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
    
        data.message === 'Query successfully resolved' && window.location.reload()
    }
}
