// Import các module cần thiết
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});



io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('cn', (data) => {
    console.log('Message from client:', data);
    io.emit('chat', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('createRoom', (roomName) => {
    socket.join(roomName);
    console.log(`Socket ${io.id} joined room ${roomName}`);
    socket.emit('roomCreated', roomName);
  });

  socket.on('chatMessage', (data) => {
    io.to(data.room).emit('chatMessage', data);
  });
});
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
