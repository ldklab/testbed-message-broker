const UDP_PORT = 3017;
const API_PORT = 3018;
const SOCKET_PORT = 3019;

const app = require('./backend/app').app;
const server = require('./backend/app').server;

app.listen(API_PORT); // REST API
server.listen(SOCKET_PORT); // SOCKET IO
