const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

//cors for connection
app.use(cors());

//create express server
const server = http.createServer();

// connect express and socket server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

//listen on connect, join_room, and disconnect
io.on("connection", (socket) => {
    console.log("user has connected");
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${socket.id} has joined room: ${data}`)
    })

})

//listen to server on port 3001
server.listen(3001, () => {
    console.log("SERVER ON PORT 3001");
})