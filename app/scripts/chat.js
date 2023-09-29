document.addEventListener("DOMContentLoaded", function () {
    const inputmensaje = document.querySelector('.input-message');
    const SendButton = document.querySelector('.send-button');
    const ChatBox = document.querySelector('.chat');

    const createMessage = (mensaje) => `<div class="message">${mensaje}</div>`;

    function sendmessage(event) {
        event.preventDefault(); // Prevent form submission

        let mensaje = inputmensaje.value;

        if (mensaje.trim() !== '') {
            ChatBox.innerHTML += createMessage(mensaje);
            inputmensaje.value = ''; // Clear the input field
        }
    }

    SendButton.addEventListener("click", sendmessage);  
});







