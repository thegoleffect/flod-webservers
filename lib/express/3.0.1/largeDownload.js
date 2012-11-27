var Kali = require('kali').Local;
var kali = new Kali({
  server: "express"
}, global);

var express = require('express');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var filepath = "/usr/share/dict/words";

var app = express();

app.get('/', function (req, res) {

  fs.readFile(filepath, function (err, data) {

    if (err) {
      throw err;
    }
    
    res.send(data.toString());
    kali.send({action: 'request', data: req.query.id});
  });
})

kali.send({action: 'started', data: 1});
app.listen(port);