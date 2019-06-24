var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

const interactionRoutes  = require("./routes/interactions")(io); // Passing reference to socket io
const devicesRoutes  = require("./routes/devices")(io); // Passing reference to socket io

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
  console.log("Someone connected!");
  //socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


module.exports = {app, server};
