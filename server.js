var express = require('express')
var app = express()

var  magnetSwitch;
var magnet = require("pi-pins").connect(17);
magnet.mode('in');
magnetSwitch = 0;

app.get('/', function (req, res) {
  res.send('Need2Wee online: ' + magnet.value())
})

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
  console.log(magnet.value());
})

magnet.on('both', function () {
    console.log("magnet changed");
    console.log(magnet.value());
});
