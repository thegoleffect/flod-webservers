var Kali = require('kali').Local;
var kali = new Kali({
  server: "director"
}, global);

var director = require('director');
var fs = require('fs');
var http = require('http');
var qs = require('querystring');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var filepath = "/usr/share/dict/words";

var download = function () {

  var self = this;
  fs.readFile(filepath, function (err, data) {

    if (err) {
      throw err;
    }
    
    self.res.writeHead(200, {'Content-Type': 'text/plain'});
    self.res.send(data.toString());
    kali.send({action: 'request', data: qs.parse(this.req.url.slice(2)).id});
  })
};

var router = new director.http.Router({
  '/': {
    get: download
  }
});

var server = http.createServer(function (req, res) {
  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }
  })
})

server.listen(port, function(){
  kali.send({action: 'started', data: 1});
});