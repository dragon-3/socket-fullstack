const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

//cors for connection
app.use(cors());

//create express server
const server = http.createServer(app);

// connect express and socket server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

//listen on connect, join_room, message and disconnect
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
  server.listen(3001, () => {
    console.log("SERVER RUNNING");
  });