import socket from 'socket.io';
import http from 'http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

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
