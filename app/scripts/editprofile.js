window.addEventListener("load", function () {
    getProfile();
});

document.getElementById("editForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const id_usuario = document.getElementById("id_usuario").value;
    updateProfile(id_usuario);
});

// Variable para obtener todos los elementos de avatar-card
const avatarCards = document.querySelectorAll(".avatar-card");

avatarCards.forEach(card => {
    // Cuando se haga click en la card elegida
    card.addEventListener("click", function () {
        // Se borra la clase 'selected' de todas las avatar-card
        avatarCards.forEach(card => card.classList.remove("selected"));
        // Se agrega la clase 'selected' a la avatar-card seleccionada para aplicarle los estilos
        this.classList.add("selected");
        // Variable para obtener el nombre del avatar seleccionado y guardarlo en el imput oculto
        const avatarName = this.getAttribute("data-avatar");
        document.getElementById("imagen_url").value = `../assets/${avatarName}`;
        // Mostrar la previsualizacion de la imagen seleccionada
        displayImagePreview(`../assets/${avatarName}`);
    });
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
                document.getElementById("imagen_url").value = data.imagen_url;

                // Si hay una URL de imagen, se muestra su previsualización
                if (data.imagen_url) {
                    displayImagePreview(data.imagen_url);
                }
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
    const url = `http://127.0.0.1:5000/modificar/${id_usuario}`;

    const formData = new FormData(document.getElementById("editForm"));
    const data = Object.fromEntries(formData.entries());

    fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
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

function displayImagePreview(imageURL) {
    const imagenPreview = document.getElementById("imagenPreview");
    if (imageURL) {
        imagenPreview.src = imageURL;
        imagenPreview.style.display = "block"; 
    }
}
