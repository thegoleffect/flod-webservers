var Kali = require('kali').Local;
var kali = new Kali({
  server: "express"
}, global);

var express = require('express');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

var app = express();
app.use(express.bodyParser());

app.post('/', function (req, res) {

  res.send(req.headers["content-length"]);
  kali.send({action: 'request', data: req.query.id});
})

app.listen(port, function(){
  kali.send({action: 'started', data: 1});
});