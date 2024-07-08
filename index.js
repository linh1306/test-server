// Import các module cần thiết
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { default: dbConnect } = require('./fuc/mongodb');
const { verifyToken } = require('./fuc/tokenJwt');
const { default: GroupChats } = require('./schemas/GroupChat');
const { default: Message } = require('./schemas/Message');

const app = express();
app.use(cors());
const server = http.createServer(app);
dbConnect()

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  socket.on('createRoom', async (token) => {
    const { statusToken, payloadToken } = await verifyToken(token)
    if (!statusToken) return socket.disconnect();

    const groups = await GroupChats.find({
      _users: payloadToken._id
    }).select(['_id'])

    groups.forEach(group => {
      socket.join(group._id);
    });

    socket.emit('notification', { status: 'true', message: 'kết nối ws thành công' });
  });

  socket.on('chatMessage', async (data) => {
    const { _user, _group_chat, content, url_images, name } = data
    const res = await Message.create({
      _user,
      _group_chat,
      content,
      url_images
    })
    if (res) {
      res.name = name
      io.to(_group_chat).emit('chatMessage', res);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
