var PORT = 3017;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var ip = require("ip");
var BROADCAST_ADDR = '192.168.0.255';

server.bind(function () {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
  server.setBroadcast(true);
});

server.on('message', function (message, rinfo) {

});



module.exports = {
  //SEARCH/SCAN for device
  scan: function(){
    var myObj = {deviceType: "TV"};
    var message = new Buffer(JSON.stringify(myObj));
    server.send(message, 0, message.length, PORT, BROADCAST_ADDR, function() { //null = 127.0.0.1
      console.log("Sent '" + message + "'from ip: " + ip.address() + " to broadcast addr: " + BROADCAST_ADDR);
    });

    return [];
  },

  //CHECK availability
  available :function(){
  },

  //SEND interaciton
  send: function(){

  }
}
