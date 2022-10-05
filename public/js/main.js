var socket = io();

const box = document.getElementById("msg");
const btn = document.getElementById("send");
const msgArea = document.getElementById("text-msgs");
const form = document.getElementById("form-id");

if (localStorage.getItem("msgs") === null){
    localStorage.setItem("msgs", "");
}
else{
    msgArea.innerHTML = localStorage.getItem("msgs");   
}

form.addEventListener("submit", e => {
    e.preventDefault();
    socket.emit("message", box.value);
    msgArea.innerHTML += `<li class="my-msg"><span>${box.value}</span></li>`
    localStorage.setItem("msgs", msgArea.innerHTML);
    box.value = "";
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on("message", msg => {
    msgArea.innerHTML += `<li class="others-msg"><span>${msg}</span></li>`;
    localStorage.setItem("msgs", msgArea.innerHTML);
    window.scrollTo(0, document.body.scrollHeight);
})


