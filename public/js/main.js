var socket = io();

const box = document.getElementById("msg");
const btn = document.getElementById("send");
const msgArea = document.getElementById("text-msgs");
const form = document.getElementById("form-id");

form.addEventListener("submit", e => {
    e.preventDefault();
    socket.emit("message", box.value);
    msgArea.innerHTML += `<li class="my-msg"><span>${box.value}</span></li>`
    box.value = "";
    window.scrollTo(0, document.body.scrollHeight);
})


socket.on("message", msg => {
    msgArea.innerHTML += `<li class="others-msg"><span>${msg}</span></li>`;
    window.scrollTo(0, document.body.scrollHeight);
})


