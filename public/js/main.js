var socket = io(); // Init Socket

// Elements
const box = document.getElementById("msg");
const btn = document.getElementById("send");
const msgArea = document.getElementById("text-msgs");
const form = document.getElementById("form-id");


// Local Storage Init
if (localStorage.getItem("msgs") === null){
    localStorage.setItem("msgs", "");
}
else{
    msgArea.innerHTML = localStorage.getItem("msgs");   
}

// When Form is submitted
form.addEventListener("submit", e => {
    e.preventDefault();

    // Sending Message to Server
    socket.emit("message", box.value);

    // Displaying text manually
    msgArea.innerHTML += `<li class="my-msg" ondblclick="deleteMsg(this)"><span>${box.value}</span></li>`

    localStorage.setItem("msgs", msgArea.innerHTML);
    box.value = "";

    // Scroll to recent msg
    window.scrollTo(0, document.body.scrollHeight);
})


// On receiving message 
socket.on("message", msg => {
    msgArea.innerHTML += `<li class="others-msg" ondblclick="deleteMsg(this)"><span>${msg}</span></li>`;
    localStorage.setItem("msgs", msgArea.innerHTML);
    window.scrollTo(0, document.body.scrollHeight);
})


// To Delete a msg
function deleteMsg(e) {
    e.remove();
    localStorage.setItem("msgs", msgArea.innerHTML);
}

