var Kali = require('kali').Local;
var kali = new Kali({
  server: "hapi"
}, global);

var Hapi = require('hapi');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

var server = new Hapi.Server(host, port);
var hello = {
  method: 'GET',
  path: '/',
  config: {
    query: {
      id: Hapi.Types.String()
    },
    handler: function (req) {
      req.reply('Hello World.');
      kali.send({action: 'request', data: req.query.id});
    }
  }
}

server.addRoute(hello);
server.start(function () {
  kali.send({action: 'started', data: 1});
});