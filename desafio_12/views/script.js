const signOutBtn = document.getElementById('signOutBtn')

signOutBtn.addEventListener('click', () => {
    const URL = 'http://localhost:8080/logout'
    fetch(URL, { 
        method: 'POST',
        body: {}
    }).then(res => window.location.reload())
})