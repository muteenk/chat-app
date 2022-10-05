const express = require("express")
const http = require("http");
const path = require('path')
const {Server} = require("socket.io")

const app = express();
const port = 8000 || process.env.port

const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', "ejs");
app.use('/static', express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    res.status(200).render('index.ejs');
});


io.on("connection", (socket) => {
    console.log('New User Connected -> ' + socket.id );
    socket.on("disconnect", () => {
        console.log("User Disconnected")
    })
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    })
});


server.listen(port, () => {
    console.log(`Serving at http://127.0.0.1:${port}`);
})

