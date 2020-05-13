import socket from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = socket(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('message', message);
  });
});

server.listen(3001, () => console.log('Listening on port 3001'));
