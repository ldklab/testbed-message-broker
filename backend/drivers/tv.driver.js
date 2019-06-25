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

    return new Promise(function (resolve, reject) {
      let reqServer = dgram.createSocket('udp4');
      //reqServer.setBroadcast(true);
      //reqServer.bind(PORT);

      var myObj = {deviceType: "TV"};
      var message = new Buffer(JSON.stringify(myObj));
      reqServer.send(message, 0, message.length, PORT, BROADCAST_ADDR, function() {
        console.log("Sent '" + message + "'from ip: " + reqServer.address().address + ":" + reqServer.address().port + " to broadcast addr: " + BROADCAST_ADDR);
      });

      reqServer.on('message', function (message, rinfo) {
        var receivedMessage = JSON.parse(message);
        console.log('Received back: ', receivedMessage);


        resolve();
      });

      setTimeout(() => {
        reqServer.close();
        reject();
      }, 1000);

    });
  },

  //CHECK availability
  available :function(){
  },

  //SEND interaciton
  send: function(){

  }
}
