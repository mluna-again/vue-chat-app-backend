import socket from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = socket(server);

const port = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('message', message);
  });
});

server.listen(port, () => console.log('Listening on port ' + port));
