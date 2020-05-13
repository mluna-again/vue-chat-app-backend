"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer();
const io = socket_io_1.default(server);
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('message', message);
    });
});
server.listen(3001, () => console.log('Listening on port 3001'));
