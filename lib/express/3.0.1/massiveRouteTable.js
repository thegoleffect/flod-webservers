var Kali = require('kali').Local;
var kali = new Kali({
  server: "express"
}, global);

var express = require('express');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var MAXROUTES = process.env.MAXROUTES || 100000;

var app = express();

for(var i = 0; i < MAXROUTES; i++){
  var rPath = "/" + i;
  app.get('/', function (req, res) {

    res.send("Hello World.");
    kali.send({action: 'request', data: req.query.id});
  })
}

kali.send({action: 'started', data: 1});
app.listen(port);