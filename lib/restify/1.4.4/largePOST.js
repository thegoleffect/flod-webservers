var Kali = require('kali').Local;
var kali = new Kali({
  server: "restify"
}, global);

var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

server.post('/', function (req, res) {

  res.send(req.headers["content-length"]);
  kali.send({action: 'request', data: req.query.id});
})

server.listen(port, function(){
  kali.send({action: 'started', data: 1});
});