import socket from 'socket.io';
import http from 'http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

const io = socket(server);

const port = process.env.PORT || 3000;

const users: any = [];

io.on('connection', (socket) => {
  socket.emit('users-online', users);

  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('new-user', (user) => {
    console.log('New user registered: ' + user);
    users.push({ user: user, userId: socket.id });
    io.emit('user', user);
  });

  socket.on('disconnect', () => {
    const userLeavingIndex = users.findIndex(
      (u: any) => u.userId === socket.id
    );

    if (userLeavingIndex === -1) return;

    io.emit('user-disconnect', users[userLeavingIndex].user);
    console.log('User leave: ' + users[userLeavingIndex].user);
    users.splice(userLeavingIndex, 1);
  });
});

server.listen(port, () => console.log('Listening on port ' + port));
