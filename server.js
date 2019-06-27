const UDP_PORT = 3017;
const API_PORT = 3018;
const SOCKET_PORT = 3019;

const app = require('./backend/app').app;
const server = require('./backend/app').server;

var ip = require("ip");
var colors = require('colors');
colors.setTheme({
  warn: 'yellow',
  debug: 'cyan',
  error: ['yellow', 'bgRed']
});

// ---------- BINDINGS ----------
// API Listening
app.listen(API_PORT, () => console.log(colors.debug('HTTP API listening on ' + ip.address() + ':' + API_PORT)) );

// Socke.io Listening
server.listen(SOCKET_PORT, () => console.log(colors.debug('Socket.io listening on '+ip.address()+':'+ SOCKET_PORT)) );
// ---------- END BINDINGS ----------
