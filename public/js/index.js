const socket = io();

let username;

Swal.fire({
    title: 'Identifícate',
    input: "text",
    text: "Ingresa tu username",
    inputValidator: (value) => {
        return !value && "Es obligatorio introducir un username";
    },
    allowOutsideClick: false
}).then((result) => {
    username = result.value;
    socket.emit("new-user", username);
});

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const inputMessage = chatInput.value;
        if (inputMessage.trim().length > 0) {
            socket.emit("chat-message", { username, message: inputMessage });
            chatInput.value = "";
        }
    }
});

const messagesPanel = document.getElementById("messages");
socket.on("messages", (data) => {
    let messages = "";
    data.forEach((m) => {
        messages += `<br><b>${m.username}:</b> ${m.message}`;
    });
    messagesPanel.innerHTML = messages;
})

socket.on("new-user", (username) => {
    Swal.fire({
        title: `${username} se ha unido al chat!`,
        toast: true,
        position: "top-end"
    });
})

