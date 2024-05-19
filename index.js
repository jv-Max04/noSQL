const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const redisClient = require('redis');

const cl = redisClient.createClient();
cl.connect().catch(console.error);
cl.on('error', (err) => {
  console.log('Error ' + err);
});

const app = express();
app.use(express.static('public'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
  const messages = await cl.lRange('messages', 0, -1);
  const parsedMessages = messages.map((msg) => JSON.parse(msg));
  socket.emit("existentes", parsedMessages);

  socket.on('chat message', (msg, user, hora) => {
    if (!msg || !user || !hora) {
      console.error('Invalid message received:', { msg, user, hora });
      return;
    }
    io.emit('chat message', msg, user, hora);
    cl.rPush('messages', JSON.stringify({ msg, user, hora }));
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
