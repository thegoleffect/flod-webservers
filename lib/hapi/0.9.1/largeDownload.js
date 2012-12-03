var Kali = require('kali').Local;
var kali = new Kali({
  server: "hapi"
}, global);

var fs = require('fs');
var Hapi = require('hapi');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var filepath = "/usr/share/dict/words";

var server = new Hapi.Server(host, port);
var download = {
  method: 'GET',
  path: '/',
  config: {
    query: {
      id: Hapi.Types.String()
    },
    handler: function (req) {

      fs.readFile(filepath, function (err, data) {

        if (err) {
          throw err;
        }
        
        req.reply(data.toString());
        kali.send({action: 'request', data: req.query.id})
      });
    }
  }
}

server.addRoute(download);
server.start(function () {
  kali.send({action: 'started', data: 1});
});