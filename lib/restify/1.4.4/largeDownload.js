var Kali = require('kali').Local;
var kali = new Kali({
  server: "restify"
}, global);

var fs = require('fs');
var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var filepath = '/usr/share/dict/words';

server.get('/', function (req, res) {

  fs.readFile(filepath, function (err, data) {

    if (err) {
      throw err;
    }
    
    res.send(data.toString());
    kali.send({action: 'request', data: req.query.id});
  });
})

kali.send({action: 'started', data: 1});
server.listen(port);