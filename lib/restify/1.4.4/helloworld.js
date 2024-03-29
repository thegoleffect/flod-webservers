var Kali = require('kali').Local;
var kali = new Kali({
  server: "restify"
}, global);

var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

server.get('/', function (req, res) {

  res.send("Hello World.");
  kali.send({action: 'request', data: req.query.id});
})

server.listen(port, function(){
  kali.send({action: 'started', data: 1});
});