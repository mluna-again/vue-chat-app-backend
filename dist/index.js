"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});
const io = socket_io_1.default(server);
const port = process.env.PORT || 3000;
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('message', message);
    });
});
server.listen(port, () => console.log('Listening on port ' + port));
