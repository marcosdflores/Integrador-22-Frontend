document.getElementById("registerForm").addEventListener("submit", function(event){
    event.preventDefault();
    register();
});

function register() {
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        contrasena: document.getElementById('contrasena').value,
        fecha_nacimiento: document.getElementById('fecha').value
    }

    fetch("http://127.0.0.1:5000/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            return response.json().then(data => {
                window.location.href = 'login.html';
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
}

