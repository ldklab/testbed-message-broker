var colors = require('colors');
colors.setTheme({
  warn: 'yellow',
  debug: 'cyan',
  error: ['yellow', 'bgRed']
});

var ip = require("ip");

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

const DriverTools = require('./drivers/driver-tool');

const DT = new DriverTools(io);
const interactionRoutes  = require("./routes/interactions")(io, DT); // Passing reference to socket io
const devicesRoutes  = require("./routes/devices")(io, DT); // Passing reference to socket io

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.use("/api/interactions", interactionRoutes);
app.use("/api/devices", devicesRoutes);



io.on('connection', function (socket) {
  console.log(colors.warn('Incoming connection on Socket.io'));
});


module.exports = {app, server};
