window.addEventListener("load", function () {
    getProfile();
});

document.getElementById("editForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const id_usuario = document.getElementById("id_usuario").value;
    updateProfile(id_usuario);
});


function getProfile() {
    const url = "http://127.0.0.1:5000/profile";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                document.getElementById("id_usuario").value = data.id_usuario;
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("apellido").value = data.apellido;
                document.getElementById("username").value = data.username;
                document.getElementById("contrasena").value = data.contrasena;
                document.getElementById("email").value = data.email;
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}

function updateProfile(id_usuario) {
    // ${} es una plantilla literal que permite insertar la variable a la cadena url
    const url = `http://127.0.0.1:5000/modificar/${id_usuario}`;
    
    // Se crea un obj FormData que compila y contiene todos los datos (vlave- valor) de los campos del form de Editar 
    const formData = new FormData(document.getElementById("editForm"));

    // Este metodo toma esos datos y los convierte en un objeto javascript que puede ser enviado en una solicitud HTTP. 
    const data = Object.fromEntries(formData.entries());
    
    fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "profile.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}