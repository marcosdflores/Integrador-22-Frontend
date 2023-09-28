const adServer = document.getElementById('ad-sv')
const expServers = document.getElementById('expl-sv')
const intgrs = document.getElementById('integs')
const contenido = document.getElementById('contenido-seccion')
const formulario = document.getElementById('conteiner-formulario')
const buscar = document.getElementById('buscar')

formulario.style.display = 'none'
buscar.style.display = 'none'

adServer.addEventListener('click',addServer)
expServers.addEventListener('click', buscarSv)

function createSv() {
    const data = {
        nombre: document.getElementById('nombre').value,
    }

    fetch("http://127.0.0.1:5000/main", {
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
                window.location.href = 'main.html';
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

function buscarSv(){
    formulario.style.display = 'none'
    intgrs.style.display = 'none'
    buscar.style.display = 'block'

}

function addServer() {
    intgrs.style.display = 'none'
    buscar.style.display = 'none'
    formulario.style.display = 'block'
    
    const nombreSv = document.getElementById('name-sv').value
    const nombreCan = document.getElementById('name-channel').value

    const crear = document.getElementById('btn-crea')

    if (nombreSv === '' && nombreCan === ''){
        console.log('Error')
    } else {
        crear.addEventListener('click', e => {
            e.preventDefault()
            console.log(nombreSv)
            console.log(nombreCan)
        })

    }
}


const boton = document.querySelector('#menu-botn')
const menu = document.querySelector('#sidemenu')

boton.addEventListener('click', e => {
    menu.classList.toggle('menu-expanded')
    menu.classList.toggle('menu-colapsed')

    document.querySelector('body').classList.toggle('body-expanded')
});

const user = 'grupo22'
const sesion = document.getElementById('usuario')

sesion.innerHTML = user

function profail() {
    const url = "http://127.0.0.1:5000/profile";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                let profil = data.username;
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

    return profil
}

const fecha = document.getElementById('fecha-hoy')

const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];