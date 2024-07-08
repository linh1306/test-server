const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { dbConnect } = require('./fuc/mongodb');
const { verifyToken } = require('./fuc/tokenJwt');
const { GroupChats } = require('./schemas/GroupChat');
const { Message } = require('./schemas/Message');

const app = express();
app.use(cors());
const server = http.createServer(app);

const connect = async () => {
  await dbConnect()
}
connect()

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
    try {
      const { statusToken, payloadToken } = await verifyToken(token)
      console.log(payloadToken, token);
      if (!statusToken) return socket.disconnect();

      const groups = await GroupChats.find({
        _users: payloadToken._id
      })

      groups.forEach(group => {
        socket.join(group._id)
      })
    } catch (e) {
      console.error(e.message)
    }
  });

  socket.on('chatMessage', async (data) => {
    try {
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
    } catch (e) {
      console.error(e.message)
    }
  })
})

server.listen(3000, () => {
  console.log('Server running on port 3000');
})
