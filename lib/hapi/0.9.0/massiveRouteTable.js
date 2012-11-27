var Kali = require('kali').Local;
var kali = new Kali({
  server: "hapi"
}, global);

var Hapi = require('hapi');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var MAXROUTES = process.env.MAXROUTES || 100000;

var server = new Hapi.Server(host, port);

var route = function (rPath) {

  rPath = rPath || "/";
  return {
    method: 'GET',
    path: rPath,
    config: {
      query: {
        id: Hapi.Types.String()
      },
      handler: function (req) {

        req.reply('Hello World.');
        kali.send({action: 'request', data: req.query.id})
      }
    }
  }
}

for(var i = 0; i < MAXROUTES; i++){
  server.addRoute(route("/" + i));
}

kali.send({action: 'started', data: 1});
server.start();