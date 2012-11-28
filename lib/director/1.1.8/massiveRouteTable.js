var Kali = require('kali').Local;
var kali = new Kali({
  server: "director"
}, global);

var director = require('director');
var http = require('http');
var qs = require('querystring');
var host = process.env.HOST || 'localhost'
var port = process.env.PORT || 3000

var helloWorld = function () {

  this.res.writeHead(200, {'Content-Type': 'text/plain'});
  this.res.end("Hello World.");
  kali.send({action: 'request', data: qs.parse(this.req.url.slice(2)).id});
}

var router = new director.http.Router();

var server = http.createServer(function (req, res) {
  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }
  })
})

var MAXROUTES = process.env.MAXROUTES || 100000

for(var i = 0; i < MAXROUTES; i++){
  var rPath = "/" + i;
  router.get(rPath, helloWorld);
}

server.listen(port, function(){
  kali.send({action: 'started', data: 1});
});