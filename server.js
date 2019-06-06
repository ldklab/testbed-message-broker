var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const API_PORT = 3018;
const SOCKET_PORT = 3019;

app.listen(API_PORT);
server.listen(SOCKET_PORT);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.get('/api/devices', function (req, res) {
  res.status(200).json(devices);
});

app.post('/api/devices', function (req, res) {
  let rndNmbr = Math.floor(Math.random() * 99) + 1;
  devices.push(
    {
      name: 'Device ' + rndNmbr,
      description: 'Description',
      content: 'Content'
    }
  );
  console.log("Device added!");
  io.emit("newDevices", devices);
  res.status(200).send({message: "Device added!"});
});


app.get('/api/interactions', function (req, res) {
  res.status(200).json(interactions);
});


io.on('connection', function (socket) {
  console.log("Someone connected!");
  //socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});




//FAKE DATA
devices = [
  {
    name: 'Smartphone',
    description: 'Description',
    content: 'Content'
  },
  {
    name: 'Smart TV',
    description: 'Description',
    content: 'Content'
  },
  {
    name: 'SONOS Speaker',
    description: 'Description',
    content: 'Content'
  }
];


interactions = [
  {
    title: 'First interaction',
    description: '5/Jun/19 @ 15:55:12',
    content: 'Content'
  },
  {
    title: 'Second interaction',
    description: '5/Jun/19 @ 15:52:41',
    content: 'Content'
  },
  {
    title: 'Third interaction',
    description: '5/Jun/19 @ 15:37:42',
    content: 'Content'
  },
  {
    title: 'Fourth interaction',
    description: '5/Jun/19 @ 15:30:22',
    content: 'Content'
  }
];
